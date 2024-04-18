import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChlidCheckOutResponse, childCheckOut } from "../../api/children";

type Args = {
  childId: string;
};

export function useChildCheckOutMutation(args: Args) {
  const queryClient = useQueryClient();

  return useMutation<ChlidCheckOutResponse, Error, void>({
    mutationFn: () =>
      childCheckOut({
        childId: args.childId,
      }),
    mutationKey: ["childCheckOut", args.childId],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["childrenList"],
      });
    },
  });
}
