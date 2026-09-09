import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CustomAuthProvider } from './components/custom/CustomAuthProvider';
import CustomSolutionLayout from './components/custom/CustomSolutionLayout';
import CustomLoginPage from './pages/custom/CustomLoginPage';
import CustomAutomationDashboardPage from './pages/custom/automation/CustomAutomationDashboardPage';
import CustomAutomationActivityPage from './pages/custom/automation/CustomAutomationActivityPage';
import CustomAutomationAccountsPage from './pages/custom/automation/CustomAutomationAccountsPage';
import CustomAutomationSettingsPage from './pages/custom/automation/CustomAutomationSettingsPage';
import CustomAutomationChatsPage from './pages/custom/automation/CustomAutomationChatsPage';
import CustomAutomationLeadsPage from './pages/custom/automation/CustomAutomationLeadsPage';
import CustomAutomationLeadChatPage from './pages/custom/automation/CustomAutomationLeadChatPage';
import CustomAutomationDmpPage from './pages/custom/automation/CustomAutomationDmpPage';
import CustomAutomationAmocrmPage from './pages/custom/automation/CustomAutomationAmocrmPage';
import CustomAutomationPromptsPage from './pages/custom/automation/CustomAutomationPromptsPage';
import CustomAutomationPromptEditPage from './pages/custom/automation/CustomAutomationPromptEditPage';

const App = () => (
  <BrowserRouter>
    <CustomAuthProvider>
      <Routes>
        <Route path="/login" element={<CustomLoginPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route element={<CustomSolutionLayout />}>
          <Route path="/dashboard" element={<CustomAutomationDashboardPage />} />
          <Route path="/activity" element={<CustomAutomationActivityPage />} />
          <Route path="/accounts" element={<CustomAutomationAccountsPage />} />
          <Route path="/settings" element={<CustomAutomationSettingsPage />} />
          <Route path="/chats" element={<CustomAutomationChatsPage />} />
          <Route path="/chats/discovery" element={<CustomAutomationChatsPage defaultTab="discovery" />} />
          <Route path="/leads" element={<CustomAutomationLeadsPage />} />
          <Route path="/leads/:leadId/chat" element={<CustomAutomationLeadChatPage />} />
          <Route path="/dmp" element={<CustomAutomationDmpPage />} />
          <Route path="/amocrm" element={<CustomAutomationAmocrmPage />} />
          <Route path="/prompts" element={<CustomAutomationPromptsPage />} />
          <Route path="/prompts/:promptId/edit" element={<CustomAutomationPromptEditPage />} />
        </Route>
        <Route
          path="/custom/automations/:id/settings"
          element={<Navigate to="/settings" replace />}
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </CustomAuthProvider>
  </BrowserRouter>
);

export default App;
