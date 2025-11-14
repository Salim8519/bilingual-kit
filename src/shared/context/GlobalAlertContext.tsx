import React, { createContext, useContext, useState } from 'react';

type AlertType = 'danger' | 'warning' | 'info';

interface AlertConfig {
  title: string;
  message: string;
  confirmText: string;
  type?: AlertType;
  buttonDelay?: number; // in milliseconds, default 1000ms
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
}

interface GlobalAlertContextType {
  showAlert: (config: AlertConfig) => void;
  hideAlert: () => void;
  alertConfig: AlertConfig | null;
  isOpen: boolean;
}

const GlobalAlertContext = createContext<GlobalAlertContextType | undefined>(undefined);

export const GlobalAlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState<AlertConfig | null>(null);

  const showAlert = (config: AlertConfig) => {
    setAlertConfig(config);
    setIsOpen(true);
  };

  const hideAlert = () => {
    setIsOpen(false);
    setTimeout(() => setAlertConfig(null), 300); // Wait for animation
  };

  return (
    <GlobalAlertContext.Provider value={{ showAlert, hideAlert, alertConfig, isOpen }}>
      {children}
    </GlobalAlertContext.Provider>
  );
};

export const useGlobalAlert = () => {
  const context = useContext(GlobalAlertContext);
  if (!context) {
    throw new Error('useGlobalAlert must be used within GlobalAlertProvider');
  }
  return context;
};
