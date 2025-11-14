import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useGlobalAlert } from '@/shared/context/GlobalAlertContext';
import { useLanguage } from '@/shared/context/LanguageContext';
import { useAlertTimer } from './hooks/useAlertTimer';
import { translations } from './translations';
import { cn } from '@/lib/utils';

export const GlobalAlert: React.FC = () => {
  const { isOpen, hideAlert, alertConfig } = useGlobalAlert();
  const { language } = useLanguage();
  const t = translations[language];

  const showConfirmButton = useAlertTimer(
    alertConfig?.buttonDelay ?? 1000,
    isOpen
  );

  if (!alertConfig) return null;

  const handleConfirm = async () => {
    await alertConfig.onConfirm();
    hideAlert();
  };

  const handleCancel = () => {
    alertConfig.onCancel?.();
    hideAlert();
  };

  const getButtonVariant = () => {
    return alertConfig.type === 'danger' ? 'destructive' : 'default';
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && hideAlert()}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className={cn(
            alertConfig.type === 'danger' && 'text-destructive'
          )}>
            {alertConfig.title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {alertConfig.message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>
            {t.cancel}
          </AlertDialogCancel>
          {showConfirmButton && (
            <AlertDialogAction
              onClick={handleConfirm}
              className={cn(
                'transition-opacity duration-300',
                getButtonVariant() === 'destructive' && 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
              )}
            >
              {alertConfig.confirmText}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
