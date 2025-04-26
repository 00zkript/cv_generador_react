import { CirclePlus } from 'lucide-react';

import { Button } from "./ui/button";

interface SectionProps {
    title: string;
    className?: string;
    children: React.ReactNode;
    addItemFunc?: () => void;
    // renderAdd?: () => React.ReactNode;
}

export default function Section({ title, className = '', children, addItemFunc }: SectionProps) {
    return (
        <div className={className}>
            <div className="flex justify-between items-center border-b py-2 mb-2 dark:border-b-gray-700">
                <h3 className="text-lg font-bold">{title}</h3>
                {addItemFunc && (
                    <Button variant={'ghost'} onClick={addItemFunc}>
                        <CirclePlus />
                        Agregar
                    </Button>
                )}
            </div>
            <div className="pb-3">{children}</div>
        </div>
    );
}