export const API_CONFIG = {
  // BASE_URL: 'https://homeless-chelsae-personal-01-a2adb1b6.koyeb.app',
  BASE_URL: 'http://localhost:3000',
  ENDPOINTS: {
    PRODUCTS: '/api/products',
    BRANDING_GENERATE: '/api/branding/generate',
    BRANDING_LIST: '/api/branding/list'
  },
  DEFAULT_PAGINATION: {
    LIMIT: 12,
    INITIAL_PAGE: 1
  }
} as const;

