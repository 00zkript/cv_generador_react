import Page from '@/components/Page';
import { Button } from '@/components/ui/button';
import cvService from '@/services/cvService';
import { CvList } from '@/types/Cv';
import { CirclePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { format } from '@formkit/tempo';

import Paginate from '@/components/Paginate';
import MenuItem from '@/components/listCvs/MenuItem';
import TablesCvs from '@/components/listCvs/TableCvs';

export default function ListaCvs() {
    const [dataPage, setDataPage] = useState<{
        total: number;
        per_page: number;
        current_page: number;
        last_page: number;
        total_pages: number;
        data: CvList[];
    }>({
        total: 0,
        per_page: 5,
        current_page: 1,
        last_page: 1,
        total_pages: 1,
        data: [],
    });

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
                handleDuplicar={handleDuplicar}
                handlePdf={handlePdf}
                handleDelete={handleDelete}
            />

            <Paginate
                currentPage={dataPage?.current_page}
                totalPages={dataPage?.total_pages}
                onPageChange={getCvs}
                limit={5}
            />
        </Page>
    );
}
