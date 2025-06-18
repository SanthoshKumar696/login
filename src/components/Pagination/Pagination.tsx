import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <div className="flex justify-center mt-6">
      <ul className="inline-flex items-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i}>
            <button
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
