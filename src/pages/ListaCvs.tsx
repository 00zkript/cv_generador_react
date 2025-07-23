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
import ModalVer from '@/components/listCvs/ModalVer';
import DialogConfirm from '@/components/DialogConfirm';

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

    const [modalCofirmDuplicate, setModalCofirmDuplicate] = useState<{
        open: boolean;
        id: number | null;
    }>({ open: false, id: null });

    const [modalCofirmDelete, setModalCofirmDelete] = useState<{
        open: boolean;
        id: number | null;
    }>({ open: false, id: null });

    const getCvs = async (page = 1) => {
        try {
            const data = await cvService.paginate(page, dataPage.per_page);
            setDataPage(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDuplicar = async () => {
        console.log('Duplicando Cv...');
        if (!modalCofirmDuplicate.id) {
            return null;
        }

        try {
            await cvService.duplicate(modalCofirmDuplicate.id);
            getCvs();
            setModalCofirmDuplicate({ open: false, id: null });
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

    const handleDelete = async () => {
        // console.log('Eliminando Cv...');

        if (!modalCofirmDelete.id) {
            return null;
        }

        try {
            await cvService.destroy(modalCofirmDelete.id);
            // setDataPage((prev) => ({
            //     ...dataPage,
            //     data: prev.data.filter((item) => item.id !== id),
            // }));
            getCvs();
            setModalCofirmDelete({ open: false, id: null });
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
                        handleDuplicar={() =>
                            setModalCofirmDuplicate({
                                open: true,
                                id: item.id,
                            })
                        }
                        handlePdf={handlePdf}
                        handleDelete={() =>
                            setModalCofirmDelete({
                                open: true,
                                id: item.id,
                            })
                        }
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

            <ModalVer
                open={modalOpen}
                setOpen={setModalOpen}
                loadingModal={loadingModal}
                errorModal={errorModal}
                modalData={modalData}
            />

            <DialogConfirm
                open={modalCofirmDuplicate.open}
                onConfirm={handleDuplicar}
                onCancel={() =>
                    setModalCofirmDuplicate({ open: false, id: null })
                }
                title="¿Está seguro de duplicar el registro?"
                variant="success"
            />

            <DialogConfirm
                open={modalCofirmDelete.open}
                onConfirm={handleDelete}
                onCancel={() => setModalCofirmDelete({ open: false, id: null })}
                title="¿Está seguro de eliminar este registro?"
                variant="destructive"
            />
        </Page>
    );
}
