import Page from '@/components/Page';
import { Button } from '@/components/ui/button';
import cvService from '@/services/cvService';
import { CvItem } from '@/types/Cv';
import { CirclePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';

import Paginate from '@/components/Paginate';
import TablesCvs from '@/components/listCvs/TableCvs';
import MenuItem from '@/components/listCvs/MenuItem';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogFooter,
    DialogHeader,
} from '@/components/ui/dialog';

export default function ListaCvs() {
    const [dataPage, setDataPage] = useState<{
        total: number;
        per_page: number;
        current_page: number;
        last_page: number;
        total_pages: number;
        data: CvItem[];
    }>({
        total: 0,
        per_page: 5,
        current_page: 1,
        last_page: 1,
        total_pages: 1,
        data: [],
    });

    const [loadingModal, setLoadingModal] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [errorModal, setErrorModal] = useState<string | null>(null);
    const [modalData, setModalData] = useState<object | null>(null);

    const getCvs = async (page = 1) => {
        try {
            const data = await cvService.paginate(page, dataPage.per_page);
            setDataPage(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDuplicar = async (id: number) => {
        console.log('Duplicando Cv...');
        try {
            await cvService.duplicate(id);
            getCvs();
        } catch (error) {
            console.error(error);
        }
    };

    const handlePdf = async (id: number) => {
        // console.log('Imprimiendo Cv...');
        // console.log(id);
        // http://localhost:8000/cvs/1/pdf
        const a = document.createElement('a');
        a.href = cvService.pdf(id);
        a.target = '_blank';
        a.click();
    };

    const handleDelete = async (id: number) => {
        // console.log('Eliminando Cv...');
        try {
            await cvService.destroy(id);
            // setDataPage((prev) => ({
            //     ...dataPage,
            //     data: prev.data.filter((item) => item.id !== id),
            // }));
            getCvs();
        } catch (error) {
            console.error(error);
        }
    };

    const handleView = async (id: number) => {
        setLoadingModal(true);
        setErrorModal(null);
        setModalOpen(true);
        try {
            const data = await cvService.show(id);
            setModalData(data);
        } catch (error) {
            setErrorModal('Error al cargar el CV');
        } finally {
            setLoadingModal(false);
        }
    };

    useEffect(() => {
        getCvs();
    }, []);

    return (
        <Page>
            <h1 className="text-center text-lg font-bold pb-4">
                Listado de CVs
            </h1>

            <div className="flex justify-end pb-4">
                <Button variant={'default'} asChild>
                    <NavLink to="cv/crear">
                        <CirclePlus />
                        Nuevo CV
                    </NavLink>
                </Button>
            </div>

            <TablesCvs
                data={dataPage.data}
                renderMenu={(item) => (
                    <MenuItem
                        item={item}
                        handleDuplicar={handleDuplicar}
                        handlePdf={handlePdf}
                        handleDelete={handleDelete}
                        handleView={handleView}
                    />
                )}
            />

            <Paginate
                currentPage={dataPage?.current_page}
                totalPages={dataPage?.total_pages}
                onPageChange={getCvs}
                limit={5}
            />

            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Detalle del CV</DialogTitle>
                        <DialogDescription>
                            {loadingModal && 'Cargando...'}
                            {errorModal && (
                                <span className="text-red-500">
                                    {errorModal}
                                </span>
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
                        <Button
                            variant="secondary"
                            onClick={() => setModalOpen(false)}
                        >
                            Cerrar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Page>
    );
}
