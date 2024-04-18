import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useChildCheckOutMutation } from "../hooks/api/useChildCheckOutMutation";

type Props = {
  childId: string;
};

type FormValues = {
  pickupTime: string;
};

export function CheckOutForm(props: Props) {
  const { mutate, isPending, error } = useChildCheckOutMutation({
    childId: props.childId,
  });

  const { handleSubmit } = useForm<FormValues>({});

  const onSubmit = useCallback(() => {
    mutate();
  }, [mutate]);

  if (isPending) return <div>Checking in...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button type="submit">Check out</button>
    </form>
  );
}
