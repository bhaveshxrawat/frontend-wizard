import z from "zod";

export const DataZod = z.array(
  z.object({
    name: z.string(),
    birthday: z.string(),
  }),
);
export type Data = z.infer<typeof DataZod>;
