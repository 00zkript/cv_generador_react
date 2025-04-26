interface CardProps {
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export default function Card({ title, children, footer }: CardProps) {
    return (
        <div className="shadow-md my-4 bg-gray-200">
            {title && (
                <div className="px-6 py-2">
                    <h2 className="text-xl font-semibold">{title}</h2>
                </div>
            )}
            <div className="py-4 px-6 bg-white">{children}</div>
            {footer && (
                <div className="clase1 clase2">
                    {footer}
                </div>
            )}
        </div>
    );
}