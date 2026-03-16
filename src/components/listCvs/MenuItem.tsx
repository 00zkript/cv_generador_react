import { Cv } from '@/types/Cv';
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
    FileText,
    Trash2,
} from 'lucide-react';
import { NavLink } from 'react-router';

interface PropsMenuItem {
    item: Cv;
    handlePdf: (id: number) => void;
    handleDelete: (id: number) => void;
    handleView: (id: number) => void;
}

function MenuItem({
    item,
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
                <DropdownMenuItem asChild>
                    <NavLink to={'/cv/editar/' + item.id}>
                        Editar
                    </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePdf(item.id)}>
                    <FileText />
                    PDF
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => handleDelete(item.id)}
                    className="text-destructive"
                >
                    <Trash2 />
                    Eliminar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default MenuItem;
