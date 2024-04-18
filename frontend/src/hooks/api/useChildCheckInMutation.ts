import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ChildCheckInPayload,
  ChlidCheckInResponse,
  childCheckIn,
} from "../../api/children";

type Args = {
  childId: string;
};

type MutationPayload = Omit<ChildCheckInPayload, "childId">;

export function useChildCheckInMutation(args: Args) {
  const queryClient = useQueryClient();

  return useMutation<ChlidCheckInResponse, Error, MutationPayload>({
    mutationFn: (payload) =>
      childCheckIn({
        childId: args.childId,
        pickupTime: payload.pickupTime,
      }),
    mutationKey: ["childCheckIn", args.childId],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["childrenList"],
      });
    },
  });
}
