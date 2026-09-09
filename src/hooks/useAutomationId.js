import { useCustomAuth } from '../components/custom/useCustomAuth';
import { ENV_CONFIG } from '../config/environment';

export const useAutomationId = () => {
  const { automationId } = useCustomAuth();
  return String(automationId || ENV_CONFIG.AUTOMATION_ID || '');
};

export default useAutomationId;
