import React from "react";

export default function Pagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      {page > 1 && (
        <button
          className="mr-2 px-2 py-1 border border-gray-300 rounded"
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </button>
      )}
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      {page < totalPages && (
        <button
          className="ml-2 px-2 py-1 border border-gray-300 rounded"
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      )}
    </section>
  );
}
