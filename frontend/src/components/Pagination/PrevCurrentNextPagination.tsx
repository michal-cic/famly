type Props = {
  goPrev: VoidFunction;
  goNext: VoidFunction;
  currentPage: number;
  lastPage: number;
};

export function PrevCurrentNextPagination(props: Props) {
  return (
    <>
      <button onClick={props.goPrev} disabled={props.currentPage === 1}>
        {"<"}
      </button>{" "}
      <span>
        Page {props.currentPage} of {props.lastPage}
      </span>{" "}
      <button
        onClick={props.goNext}
        disabled={props.currentPage === props.lastPage}
      >
        {">"}
      </button>
    </>
  );
}
