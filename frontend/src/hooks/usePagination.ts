import { useCallback, useMemo, useState } from "react";

type Props = {
  itemCount: number;
};

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 5;

export function usePagination(props: Props) {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const lastPage = useMemo(
    () => Math.ceil(props.itemCount / pageSize),
    [props.itemCount, pageSize]
  );

  const goToNextPage = useCallback(() => {
    const nextPage = page + 1;

    if (nextPage <= lastPage) {
      setPage(page + 1);
    }
  }, [lastPage, page]);

  const goToPrevPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const goToPage = useCallback(
    (targetPage: number) => {
      if (targetPage > 0 && targetPage <= lastPage) {
        setPage(targetPage);
      }
    },
    [lastPage]
  );

  return {
    page,
    lastPage,
    pageSize,
    goToPage,
    setPageSize,
    goToNextPage,
    goToPrevPage,
  };
}
