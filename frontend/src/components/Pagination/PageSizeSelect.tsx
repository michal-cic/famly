type Props = {
  options: number[];
  onChange: (value: number) => void;
};

export function PageSizeSelect(props: Props) {
  return (
    <>
      <span>Page size: </span>
      <select
        onChange={(e) => {
          props.onChange(+e.target.value);
        }}
      >
        {props.options.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </>
  );
}
