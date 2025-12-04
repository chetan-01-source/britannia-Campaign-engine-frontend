export interface CampaignHistoryResponse {
  success: boolean;
  data: CampaignHistoryItem[];
  totalCount: number;
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
    skip: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  timestamp: string;
}

export interface CampaignHistoryItem {
  _id: string;
  productName: string;
  platform: string;
  tone: string;
  style: string;
  flavor: string;
  generatedCaption: string;
  generatedTagline: string;
  imageUrl: string;
  localImagePath: string;
  prompt: string;
  metadata: {
    dimensions: string;
    format: string;
    generatedAt: string;
    freepikTaskId: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const getCampaignHistory = async (page: number = 1, limit: number = 6): Promise<CampaignHistoryResponse> => {
  const response = await fetch(`https://homeless-chelsae-personal-01-a2adb1b6.koyeb.app/api/branding/list?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  return result;
};