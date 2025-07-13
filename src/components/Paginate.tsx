import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from './ui/pagination';

interface PaginateType {
    onPageChange: (number: number) => void;
    totalPages: number;
    limit: number;
    currentPage: number;
}

function Paginate({
    onPageChange,
    totalPages,
    limit,
    currentPage,
}: PaginateType) {
    const renderPageNumbers = () => {
        const items = [];
        const halfLimit = Math.floor(limit / 2);

        // Calculate start and end pages
        let startPage = Math.max(1, currentPage - halfLimit);
        const endPage = Math.min(totalPages, startPage + limit - 1);

        // Adjust start page if we're near the end
        if (endPage - startPage + 1 < limit) {
            startPage = Math.max(1, endPage - limit + 1);
        }

        // Show ellipsis at start if needed
        if (startPage > 1) {
            items.push(
                <PaginationItem key="ellipsis-start">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        // Generate page numbers
        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        href="#"
                        isActive={currentPage === i}
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(i);
                        }}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Show ellipsis at end if needed
        if (endPage < totalPages) {
            items.push(
                <PaginationItem key="ellipsis-end">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        return items;
    };

    return (
        <Pagination>
            <PaginationContent>
                {currentPage > 1 && (
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(currentPage - 1);
                            }}
                        />
                    </PaginationItem>
                )}
                {renderPageNumbers()}
                {currentPage < totalPages && (
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(currentPage + 1);
                            }}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}

export default Paginate;
