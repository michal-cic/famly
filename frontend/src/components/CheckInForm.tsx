import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useChildCheckInMutation } from "../hooks/api/useChildCheckInMutation";
import { getCurrentTime } from "../lib/getCurrentTime";

type Props = {
  childId: string;
};

type FormValues = {
  pickupTime: string;
};

export function CheckInForm(props: Props) {
  const { mutate, isPending, error } = useChildCheckInMutation({
    childId: props.childId,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      pickupTime: "",
    },
  });
  const onSubmit = useCallback(
    (values: FormValues) => {
      const payload = {
        pickupTime: values.pickupTime,
      };
      mutate(payload);
    },
    [mutate]
  );

  if (isPending) return <div>Checking in...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Pickup time:{" "}
        <input
          type="time"
          {...register("pickupTime", {
            required: "This field is required",
            min: {
              message: "Pickup time needs to be later than now",
              value: getCurrentTime(),
            },
          })}
        />
      </label>{" "}
      <button type="submit">Check in</button>
      {errors.pickupTime?.message && (
        <div style={{ color: "red" }}>{errors.pickupTime.message}</div>
      )}
    </form>
  );
}
