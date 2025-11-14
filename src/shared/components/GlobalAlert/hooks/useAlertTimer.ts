import { useState, useEffect } from 'react';

export const useAlertTimer = (delay: number = 1000, isOpen: boolean) => {
  const [showConfirmButton, setShowConfirmButton] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowConfirmButton(false);
      return;
    }

    if (delay === 0) {
      setShowConfirmButton(true);
      return;
    }

    const timer = setTimeout(() => {
      setShowConfirmButton(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, isOpen]);

  return showConfirmButton;
};
