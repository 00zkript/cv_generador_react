import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogFooter,
    DialogHeader,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';

export interface ModalVerType {
    open: boolean;
    setOpen: (open: boolean) => void;
    loadingModal: boolean | null;
    errorModal: string | null;
    modalData: object | null;
}

function ModalVer({
    open: open,
    setOpen: setOpen,
    loadingModal,
    errorModal,
    modalData,
}: ModalVerType) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Detalle del CV</DialogTitle>
                    <DialogDescription>
                        {loadingModal && 'Cargando...'}
                        {errorModal && (
                            <span className="text-red-500">{errorModal}</span>
                        )}
                    </DialogDescription>
                </DialogHeader>
                {modalData && (
                    <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs max-h-64 overflow-auto">
                        {JSON.stringify(modalData, null, 2)}
                    </pre>
                )}
                <DialogFooter>
                    <Button
                        onClick={() => {
                            if (modalData) {
                                navigator.clipboard.writeText(
                                    JSON.stringify(modalData, null, 2)
                                );
                            }
                        }}
                        disabled={!modalData}
                    >
                        Copiar
                    </Button>
                    <Button variant="secondary" onClick={() => setOpen(false)}>
                        Cerrar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ModalVer;
