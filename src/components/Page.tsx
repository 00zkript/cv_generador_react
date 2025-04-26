interface PageProps {
    children: React.ReactNode;
    className?: string;
}

export default function Page({ children, className = '' }: PageProps) {
    return (
        <div className={`page container mx-auto bg-white dark:bg-gray-900 px-8 py-4 my-4 w-3/4 shadow-lg rounded-lg ${className}`}>
            {children}
        </div>
    )
}