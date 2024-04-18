import { useMemo } from "react";
import { usePagination } from "../hooks/usePagination";
import { Table } from "./Table";
import { PrevCurrentNextPagination } from "./Pagination/PrevCurrentNextPagination";
import { PageSizeSelect } from "./Pagination/PageSizeSelect";
import { PageButtonsPagination } from "./Pagination/PageButtonsPagination";
import { GoToPageInput } from "./Pagination/GoToPageInput";
import { useChildrenListQuery } from "../hooks/api/useChildrenListQuery";

export function AttendanceSheet() {
  const { error, isLoading, data } = useChildrenListQuery({
    groupId: "86413ecf-01a1-44da-ba73-1aeda212a196",
    institutionId: "dc4bd858-9e9c-4df7-9386-0d91e42280eb",
  });
  const {
    page,
    pageSize,
    goToPage,
    setPageSize,
    lastPage,
    goToNextPage,
    goToPrevPage,
  } = usePagination({
    itemCount: data?.children.length ?? 0,
  });

  const paginatedItems = useMemo(() => {
    if (!data?.children) return [];

    const startIncl = (page - 1) * pageSize;
    const endExcl = (page - 1) * pageSize + pageSize;
    return data.children.slice(startIncl, endExcl);
  }, [data?.children, page, pageSize]);

  if (isLoading) return <p>Loading children...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Table children={paginatedItems} />
        <div>
          <PrevCurrentNextPagination
            lastPage={lastPage}
            currentPage={page}
            goNext={goToNextPage}
            goPrev={goToPrevPage}
          />
        </div>
        <div>
          <PageSizeSelect
            options={[5, 10, 15, 20, 25]}
            onChange={(value) => {
              goToPage(1);
              setPageSize(value);
            }}
          />
        </div>
        {/* PageButtons */}
        <div>
          <PageButtonsPagination
            currentPage={page}
            onClick={goToPage}
            pagesCount={lastPage}
          />
        </div>
        {/* GoToPage */}
        <div>
          <GoToPageInput pagesCount={lastPage} onSubmit={goToPage} />
        </div>
      </div>
    </>
  );
}
