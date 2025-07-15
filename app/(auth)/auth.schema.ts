import { z } from "zod";

const authSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export type AuthSchemaType = z.infer<typeof authSchema>;
export default authSchema;
