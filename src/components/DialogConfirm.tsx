import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogFooter,
    DialogHeader,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type DialogVariant = 'destructive' | 'warning' | 'success' | 'info';

interface DialogConfirmProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title?: string;
    message?: string;
    variant?: DialogVariant;
    confirmText?: string;
    cancelText?: string;
}

function DialogConfirm({
    open,
    onConfirm,
    onCancel,
    title = '¿Está seguro?',
    message = 'Esta acción no se puede deshacer.',
    variant = 'warning',
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
}: DialogConfirmProps) {
    const getVariantStyles = () => {
        const styles = {
            destructive: {
                buttonVariant: 'destructive' as const,
                containerClass: 'border-destructive/50',
            },
            warning: {
                buttonVariant: 'ghost' as const,
                containerClass: 'border-warning/50',
            },
            success: {
                buttonVariant: 'default' as const,
                containerClass: 'border-success/50',
            },
            info: {
                buttonVariant: 'secondary' as const,
                containerClass: 'border-secondary/50',
            },
        };
        return styles[variant];
    };

    const variantStyles = getVariantStyles();

    return (
        <Dialog open={open}>
            <DialogContent
                className={cn('sm:max-w-[425px]', variantStyles.containerClass)}
            >
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>

                <DialogFooter className="gap-2">
                    <Button
                        variant={
                            variantStyles.buttonVariant as
                                | 'destructive'
                                | 'secondary'
                                | 'default'
                                | 'outline'
                                | 'ghost'
                        }
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </Button>
                    <Button variant="outline" onClick={onCancel}>
                        {cancelText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DialogConfirm;
