import { useState, useRef, useEffect } from "react";
import { Button } from './ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AcordeonProps {
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export default function Acordeon({ title, children, footer }: AcordeonProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [maxHeight, setMaxHeight] = useState("0px");
    const contentRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const updateHeight = () => {
            if (contentRef.current) {
                setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
            }
        };

        // Actualiza la altura cuando `isOpen` o `children` cambian
        updateHeight();

        // Observa cambios en el tamaño del contenido
        const resizeObserver = new ResizeObserver(() => {
            updateHeight();
        });

        // Observa el contenedor principal
        if (contentRef.current) {
            resizeObserver.observe(contentRef.current);
        }

        // Observa cambios en los elementos internos, como los textarea
        const textareas = contentRef.current?.querySelectorAll("textarea");
        textareas?.forEach((textarea) => {
            resizeObserver.observe(textarea);
        });

        return () => {
            if (contentRef.current) {
                resizeObserver.unobserve(contentRef.current);
            }
            textareas?.forEach((textarea) => {
                resizeObserver.unobserve(textarea);
            });
        };
    }, [isOpen, children]);

    return (
        <div className="shadow-md my-4 bg-gray-200 dark:bg-gray-700">
            <div className="px-6 py-2 flex justify-between items-center">
                <h2 className="text-xl font-semibold">{title}</h2>
                <Button variant={'ghost'} size={'icon'} className="" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                </Button>
            </div>
            <div ref={contentRef} style={{ maxHeight }} className="overflow-hidden transition-all duration-300">
                <div className="py-4 px-6 bg-white dark:bg-gray-900"> {children} </div>
                {footer && (
                    <div className="py-4 px-6 bg-white dark:bg-gray-900 text-right border-t border-gray-200 dark:border-gray-700">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
