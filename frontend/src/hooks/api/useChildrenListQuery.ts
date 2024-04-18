import { useQuery } from "@tanstack/react-query";
import {
  ChildrenListPayload,
  ChildrenListResponse,
  childrenList,
} from "../../api/children";

type Args = Omit<ChildrenListPayload, "signal">;

export function useChildrenListQuery(args: Args) {
  return useQuery<ChildrenListResponse, Error>({
    queryFn: ({ signal }) =>
      childrenList({
        signal,
        groupId: args.groupId,
        institutionId: args.institutionId,
      }),
    queryKey: ["childrenList", args.groupId, args.institutionId],
  });
}
