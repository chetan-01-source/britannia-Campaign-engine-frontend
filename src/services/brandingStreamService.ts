import { fetchEventSource } from '@microsoft/fetch-event-source';
import { API_CONFIG } from './config';

// Custom error to signal intentional stream close (no retry)
class StreamDoneError extends Error {
  constructor() {
    super('Stream complete');
    this.name = 'StreamDoneError';
  }
}

export interface StreamCallbacks {
  onProgress: (progress: number, stage: string, status: string) => void;
  onCaptionReady: (caption: string, hashtags?: string[], cta?: string) => void;
  onImageReady: (imageUrl: string) => void;
  onComplete: (fullResult: Record<string, unknown>) => void;
  onError: (error: string) => void;
  onQueueUpdate?: (position: number, estimatedWait: number) => void;
}

export async function generateBrandingStream(
  params: {
    productName: string;
    tone: string;
    platform?: string;
    flavor?: string;
    style?: string;
  },
  callbacks: StreamCallbacks,
  abortController?: AbortController
): Promise<void> {
  const ctrl = abortController || new AbortController();

  try {
    await fetchEventSource(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.BRANDING_GENERATE_STREAM}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
        signal: ctrl.signal,

        // Keep connection alive even when tab is in background
        openWhenHidden: true,

        onopen(response) {
          if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
          }
          return Promise.resolve();
        },

        onmessage(ev) {
          if (!ev.event) return;

          const data = JSON.parse(ev.data);

          switch (ev.event) {
            case 'connected':
              callbacks.onProgress(0, 'connected', 'started');
              break;

            case 'stage:validation':
              callbacks.onProgress(data.progress, 'validation', data.status);
              break;

            case 'stage:caption':
              callbacks.onProgress(data.progress, 'caption', data.status);
              if (data.status === 'complete' && data.data) {
                callbacks.onCaptionReady(
                  data.data.caption,
                  data.data.hashtags,
                  data.data.cta
                );
              }
              break;

            case 'stage:rateLimit':
              callbacks.onProgress(data.progress, 'rateLimit', data.status);
              if (data.status === 'queued' && callbacks.onQueueUpdate) {
                callbacks.onQueueUpdate(data.queuePosition, data.estimatedWait);
              }
              break;

            case 'stage:image':
              callbacks.onProgress(data.progress, 'image', data.status);
              break;

            case 'stage:upload':
              callbacks.onProgress(data.progress, 'upload', data.status);
              if (data.status === 'complete' && data.data?.imageUrl) {
                callbacks.onImageReady(data.data.imageUrl);
              }
              break;

            case 'stage:save':
              callbacks.onProgress(data.progress, 'save', data.status);
              break;

            case 'complete':
              callbacks.onProgress(100, 'complete', 'complete');
              callbacks.onComplete(data.data);
              // Abort to prevent auto-retry after server closes connection
              ctrl.abort();
              throw new StreamDoneError();

            case 'error':
              callbacks.onError(data.message || 'Generation failed');
              ctrl.abort();
              throw new StreamDoneError();
          }
        },

        onclose() {
          // Server closed the connection — don't retry
          throw new StreamDoneError();
        },

        onerror(err) {
          if (err instanceof StreamDoneError) {
            // Intentional close, stop retrying
            throw err;
          }
          // Real error — notify and stop retrying
          callbacks.onError('Connection lost. Please try again.');
          throw err;
        },
      }
    );
  } catch (err) {
    // StreamDoneError and AbortError are expected, swallow them
    if (err instanceof StreamDoneError) return;
    if (err instanceof Error && err.name === 'AbortError') return;
    throw err;
  }
}
