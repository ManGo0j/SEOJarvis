const viteApiBase = import.meta.env.VITE_API_BASE_URL;

const normalizeApiBaseUrl = (rawBaseUrl) => {
  if (rawBaseUrl === undefined || rawBaseUrl === null) {
    return '';
  }
  const trimmed = String(rawBaseUrl).trim();
  if (trimmed === '' || trimmed === '/api') {
    return '';
  }
  const noTrailingSlash = trimmed.replace(/\/+$/, '');
  return noTrailingSlash.replace(/\/api$/, '');
};

export const ENV_CONFIG = {
  API: {
    BASE_URL: normalizeApiBaseUrl(viteApiBase),
    TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10),
  },
  APP: {
    NAME: import.meta.env.VITE_APP_NAME || 'SEO-Джарвис',
    TAGLINE: import.meta.env.VITE_APP_TAGLINE || 'Кабинет автоматизаций',
  },
  AUTOMATION_ID: String(import.meta.env.VITE_AUTOMATION_ID || '2').trim(),
  STORAGE_KEYS: {
    CUSTOM_TOKEN: 'custom_token',
    CUSTOM_AUTOMATION_ID: 'custom_automation_id',
    CUSTOM_IS_ADMIN: 'custom_is_admin',
  },
};

export default ENV_CONFIG;
