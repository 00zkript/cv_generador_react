import Page from '@/components/Page';
import { Button } from '@/components/ui/button';
import cvService from '@/services/cvService';
import { Cv, PaginatedCvs } from '@/types/Cv';
import { CirclePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';

import Paginate from '@/components/Paginate';
import TablesCvs from '@/components/listCvs/TableCvs';
import MenuItem from '@/components/listCvs/MenuItem';
import ModalVer from '@/components/listCvs/ModalVer';
import DialogConfirm from '@/components/DialogConfirm';

export default function ListaCvs() {
    const [dataPage, setDataPage] = useState<PaginatedCvs>({
        total: 0,
        per_page: 5,
        current_page: 1,
        last_page: 1,
        total_pages: 1,
        from: 0,
        to: 0,
        data: [],
    });

    const [loadingModal, setLoadingModal] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [errorModal, setErrorModal] = useState<string | null>(null);
    const [modalData, setModalData] = useState<Cv | null>(null);

    const [modalCofirmDelete, setModalCofirmDelete] = useState<{
        open: boolean;
        id: number | null;
    }>({ open: false, id: null });

    const getCvs = async (page = 1) => {
        try {
            const data = await cvService.index(page, dataPage.per_page);
            setDataPage(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePdf = async (id: number) => {
        const a = document.createElement('a');
        a.href = cvService.pdf(id);
        a.target = '_blank';
        a.click();
    };

    const handleDelete = async () => {
        if (!modalCofirmDelete.id) {
            return null;
        }

        try {
            await cvService.destroy(modalCofirmDelete.id);
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
                Mis CVs
            </h1>

            <div className="flex justify-end pb-4">
                <Button variant={'default'} asChild>
                    <NavLink to="/cv/crear">
                        <CirclePlus />
                        Nuevo CV
                    </NavLink>
                </Button>
            </div>

            <TablesCvs
                data={dataPage.data}
                renderMenu={(item: Cv) => (
                    <MenuItem
                        item={item}
                        handlePdf={() => handlePdf(item.id)}
                        handleDelete={() =>
                            setModalCofirmDelete({
                                open: true,
                                id: item.id,
                            })
                        }
                        handleView={() => handleView(item.id)}
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
                open={modalCofirmDelete.open}
                onConfirm={handleDelete}
                onCancel={() => setModalCofirmDelete({ open: false, id: null })}
                title="¿Está seguro de eliminar este registro?"
                variant="destructive"
            />
        </Page>
    );
}
