import { useState } from "react";

type Props = {
  onSubmit: (target: number) => void;
  pagesCount: number;
};

export function GoToPageInput(props: Props) {
  const [target, setTarget] = useState<null | number>(null);

  return (
    <>
      <span>Go to page: </span>
      <input
        type="number"
        onChange={(e) => {
          setTarget(e.target.valueAsNumber);
        }}
      />{" "}
      <button
        disabled={!target || target > props.pagesCount}
        onClick={() => {
          setTarget(null);

          if (target) {
            props.onSubmit(target);
          }
        }}
      >
        Go
      </button>
    </>
  );
}
