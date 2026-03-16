import { Cv } from '@/types/Cv';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

interface ModalVerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    loadingModal: boolean;
    errorModal: string | null;
    modalData: Cv | null;
}

export default function ModalVer({
    open,
    setOpen,
    loadingModal,
    errorModal,
    modalData,
}: ModalVerProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {modalData?.title || 'CV'}
                    </DialogTitle>
                </DialogHeader>

                {loadingModal && (
                    <div className="flex justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                )}

                {errorModal && (
                    <div className="text-destructive py-4">{errorModal}</div>
                )}

                {modalData && !loadingModal && (
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold">Puesto Objetivo</h3>
                            <p>{modalData.target_role || '-'}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Empresa</h3>
                            <p>{modalData.target_company || '-'}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Descripción</h3>
                            <p className="whitespace-pre-wrap">{modalData.job_description || '-'}</p>
                        </div>
                        {modalData.versions && modalData.versions.length > 0 && (
                            <div>
                                <h3 className="font-semibold">Versiones</h3>
                                <p>{modalData.versions.length} versión(es)</p>
                            </div>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
