import React from 'react';
import { 
  ImprovedDialog, 
  ImprovedDialogContent, 
  ImprovedDialogHeader, 
  ImprovedDialogBody,
  ImprovedDialogFooter,
  ImprovedDialogTitle,
  ImprovedDialogDescription 
} from './ui/improved-dialog';
import { Button } from './ui/button';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  isLoading?: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  isLoading = false
}: ConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  const isDestructive = variant === 'destructive';

  return (
    <ImprovedDialog open={isOpen} onOpenChange={onClose}>
      <ImprovedDialogContent size="small">
        <ImprovedDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            {isDestructive ? (
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-purple-400" />
              </div>
            )}
            <ImprovedDialogTitle className="text-left">
              {title}
            </ImprovedDialogTitle>
          </div>
          <ImprovedDialogDescription className="text-left text-base leading-relaxed">
            {description}
          </ImprovedDialogDescription>
        </ImprovedDialogHeader>

        <ImprovedDialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="border-border/50 hover:bg-accent/50"
          >
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            className={
              isDestructive
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500"
            }
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              confirmText
            )}
          </Button>
        </ImprovedDialogFooter>
      </ImprovedDialogContent>
    </ImprovedDialog>
  );
}