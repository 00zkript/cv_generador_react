import { CvItem } from '@/types/Cv';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import {
    Ellipsis,
    Eye,
    FilePenLine,
    FileStack,
    FileText,
    Trash2,
} from 'lucide-react';
import { NavLink } from 'react-router';

interface PropsMenuItem {
    item: CvItem;
    handleDuplicar: (id: number) => void;
    handlePdf: (id: number) => void;
    handleDelete: (id: number) => void;
    handleView: (id: number) => void;
}

function MenuItem({
    item,
    handleDuplicar,
    handlePdf,
    handleDelete,
    handleView,
}: PropsMenuItem) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Ellipsis />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleView(item.id)}>
                    <Eye />
                    Ver
                </DropdownMenuItem>
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

export default MenuItem;
