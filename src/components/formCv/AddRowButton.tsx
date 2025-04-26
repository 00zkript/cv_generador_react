import { CirclePlus } from 'lucide-react';

import { Button } from "../ui/button";

interface AddRowButtonInterface extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function AddRowButton({ onClick } : AddRowButtonInterface) {

    return (
        <Button onClick={onClick}>
            <CirclePlus />
            Agregar
        </Button>
    );
}