const Pagination = ({ totalPages, paginate, currentPage }) => {
  const pageNumbers = [];

  // Batasi jumlah tombol halaman yang ditampilkan
  const maxPageNumbersToShow = 5;
  let startPage = Math.max(currentPage - Math.floor(maxPageNumbersToShow / 2), 1);
  let endPage = startPage + maxPageNumbersToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="flex flex-wrap justify-center">
        {/* Tombol First Page */}
        {currentPage > 1 && (
          <li className="mx-1 my-1">
            <button
              onClick={() => paginate(1)} // Mengarahkan ke halaman pertama
              className="px-4 py-2 rounded bg-gray-300 text-black"
            >
              First
            </button>
          </li>
        )}

        {/* Tombol Prev */}
        {currentPage > 1 && (
          <li className="mx-1 my-1">
            <button
              onClick={() => paginate(currentPage - 1)}
              className="px-4 py-2 rounded bg-gray-300 text-black"
            >
              Prev
            </button>
          </li>
        )}

        {/* Tombol Pagination */}
        {pageNumbers.map((number) => (
          <li key={number} className="mx-1 my-1">
            <button
              onClick={() => paginate(number)}
              className={`px-4 py-2 rounded ${number === currentPage
                ? 'bg-black text-white'
                : 'bg-gray-300 text-black'
                }`}
            >
              {number}
            </button>
          </li>
        ))}

        {/* Tombol Next */}
        {currentPage < totalPages && (
          <li className="mx-1 my-1">
            <button
              onClick={() => paginate(currentPage + 1)}
              className="px-4 py-2 rounded bg-gray-300 text-black"
            >
              Next
            </button>
          </li>
        )}

        {/* Tombol Last Page */}
        {currentPage < totalPages && (
          <li className="mx-1 my-1">
            <button
              onClick={() => paginate(totalPages)} // Mengarahkan ke halaman terakhir
              className="px-4 py-2 rounded bg-gray-300 text-black"
            >
              Last
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
export default Pagination;