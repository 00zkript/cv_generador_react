import Page from '@/components/Page';
import { Button } from '@/components/ui/button';
import cvService from '@/services/cvService';
import { CvList, CvListSchema } from '@/types/Cv';
import {
    CirclePlus,
    Ellipsis,
    FilePenLine,
    FileStack,
    FileText,
    Trash2,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { format } from '@formkit/tempo';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Paginate from '@/components/Paginate';

// import { z } from "zod";

interface PropsMenuItem {
    item: CvList;
    handleDuplicar: (id: number) => void;
    handlePdf: (id: number) => void;
    handleDelete: (id: number) => void;
}

function MenuItem({
    item,
    handleDuplicar,
    handlePdf,
    handleDelete,
}: PropsMenuItem) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Ellipsis />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleDuplicar(item.id)}>
                    <FileStack />
                    Duplicar
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <NavLink to={'cv/editar/' + item.id}>
                        <FilePenLine />
                        Editar
                    </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePdf(item.id)}>
                    <FileText />
                    PDF
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => handleDelete(item.id)}
                    variant="destructive"
                >
                    <Trash2 />
                    Eliminar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function ListaCvs() {
    const [data, setData] = useState<CvList[]>([]);
    const [page, setPage] = useState(1);

    const getCvs = async () => {
        try {
            const cvsList = await cvService.index();
            // const parsedCvsList = z.array(CvListSchema).parse(cvsList);
            setData(cvsList);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCvs();
    }, []);

    const handleDuplicar = async (id: number) => {
        console.log('Duplicando Cv...');
        try {
            const result = await cvService.duplicate(id);
            const parsedResult = CvListSchema.parse(result);
            setData((prev) => [...prev, parsedResult]);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePdf = async (id: number) => {
        console.log('Imprimiendo Cv...');
        // console.log(id);
        // http://localhost:8000/cvs/1/pdf
        const a = document.createElement('a');
        a.href = cvService.pdf(id);
        a.target = '_blank';
        a.click();
    };

    const handleDelete = async (id: number) => {
        console.log('Eliminando Cv...');
        try {
            await cvService.destroy(id);
            setData((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

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

            <table className="table-auto w-full table-c1">
                <thead>
                    <tr className="text-center">
                        <th>Acción</th>
                        <th>Idioma</th>
                        <th>Nombre</th>
                        <th>Propósito</th>
                        <th>Version</th>
                        <th>Fecha creación</th>
                        <th>Ultima modificación</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className="text-center">
                                <MenuItem
                                    item={item}
                                    handleDuplicar={handleDuplicar}
                                    handlePdf={handlePdf}
                                    handleDelete={handleDelete}
                                />
                            </td>
                            <td>{item.language}</td>
                            <td>{item.name}</td>
                            <td>{item.subject}</td>
                            <td className="text-center">{item.version}</td>
                            <td className="text-center">
                                {format(
                                    item.created_at ?? '',
                                    'medium',
                                    'es-Pe'
                                )}
                            </td>
                            <td className="text-center">
                                {format(
                                    item.updated_at ?? '',
                                    'medium',
                                    'es-Pe'
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Paginate
                page={page}
                totalPages={10}
                onPageChange={(page) => {
                    console.log('Page changed to:', page);
                    setPage(page);
                }}
                limit={5}
            />
        </Page>
    );
}
