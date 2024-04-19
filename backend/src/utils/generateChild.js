import { nanoid } from "nanoid";

export function generateChild(options) {
  const id = nanoid(5);

  return {
    id,
    checkInAt: options?.checkInAt ?? null,
    checkOutAt: options?.checkOutAt ?? null,
  };
}
