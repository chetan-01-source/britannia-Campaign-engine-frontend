export interface BrandingResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    productName: string;
    tone: string;
    platform: string;
    style: string;
    flavor: string;
    caption: string;
    tagline: string;
    imageUrl: string;
    localImagePath: string;
    prompt: string;
    hashtags: string[];
    cta: string;
    metadata: {
      dimensions: string;
      format: string;
      freepikTaskId: string;
      contentDetails: {
        model: string;
        relevantProducts: number;
        wordCount: number;
        characterCount: number;
      };
    };
    createdAt: string;
  };
  timestamp: string;
}

export const generateBranding = async (data: {
  productName: string;
  tone: string;
  platform: string;
  style: string;
  flavor: string;
}): Promise<BrandingResponse> => {
  const response = await fetch('https://homeless-chelsae-personal-01-a2adb1b6.koyeb.app/api/branding/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  return result;
};