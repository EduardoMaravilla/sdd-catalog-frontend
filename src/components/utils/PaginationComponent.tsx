import { FC } from "react";
import { Pagination } from "react-bootstrap";

interface PaginationComponentProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const PaginationComponent: FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {

  const maxVisiblePages = 5;

  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const adjustedStartPage = Math.max(1, endPage - maxVisiblePages + 1);

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="d-flex justify-content-center my-2">
      <Pagination>
        <Pagination.First 
          onClick={() => handlePageClick(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev 
          onClick={() => handlePageClick(currentPage - 1)} 
          disabled={currentPage === 1} 
        />
        {Array.from({ length: endPage - adjustedStartPage + 1 }, (_, i) => {
          const pageNumber = adjustedStartPage + i;
          return (
            <Pagination.Item
              key={pageNumber}
              active={pageNumber === currentPage}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </Pagination.Item>
          );
        })}

        <Pagination.Next 
          onClick={() => handlePageClick(currentPage + 1)} 
          disabled={currentPage === totalPages} 
        />
        <Pagination.Last 
          onClick={() => handlePageClick(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};
