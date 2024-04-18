type Props = {
  pagesCount: number;
  onClick: (target: number) => void;
  currentPage: number;
};

export function PageButtonsPagination(props: Props) {
  return (
    <>
      <span>Pages: </span>
      {Array(props.pagesCount)
        .fill("")
        .map((_, index) => {
          const pageToGoTo = index + 1;
          return (
            <button
              disabled={pageToGoTo === props.currentPage}
              onClick={() => props.onClick(pageToGoTo)}
              key={index}
            >
              {pageToGoTo}
            </button>
          );
        })}
    </>
  );
}
