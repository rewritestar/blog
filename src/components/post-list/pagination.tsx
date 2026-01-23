interface PaginationProps {
  postTotal: number;
  limit: number;
  currentPageIdx: number;
  movePage: (i: number) => void;
}

export function Pagination({
  postTotal,
  limit,
  currentPageIdx,
  movePage,
}: PaginationProps) {
  const pageCount: number = Math.ceil(postTotal / limit);
  return (
    <div className="flex justify-center ">
      {Array(pageCount)
        .fill(null)
        .map((_, i) => {
          return (
            <button
              className={`border border-gray-200 p-2 mr-1 ${i === currentPageIdx && "font-bold"}`}
              onClick={() => {
                movePage(i);
              }}
            >
              {i + 1}
            </button>
          );
        })}
    </div>
  );
}
