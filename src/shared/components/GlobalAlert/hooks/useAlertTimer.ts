import { useState, useEffect } from 'react';

export const useAlertTimer = (delay: number = 1000, isOpen: boolean) => {
  const [remainingTime, setRemainingTime] = useState(delay);

  useEffect(() => {
    if (!isOpen) {
      setRemainingTime(delay);
      return;
    }

    if (delay === 0) {
      setRemainingTime(0);
      return;
    }

    setRemainingTime(delay);
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, delay - elapsed);
      
      setRemainingTime(remaining);
      
      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [delay, isOpen]);

  const isReady = remainingTime === 0;
  const secondsRemaining = Math.ceil(remainingTime / 1000);

  return { isReady, secondsRemaining };
};
