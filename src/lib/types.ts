import z from "zod";

export const FormSchema = z.object({
  email: z.string().describe("Email").email({ message: "Invalid email" }),
  password: z.string().describe("Password").min(1, "Password is required"),
});

export const SignupFormSchema = z
  .object({
    email: z.string().describe("Email").email({ message: "Invalid email" }),
    password: z
      .string()
      .describe("Password")
      .min(6, "Password must be 6 characters minimum"),
    confirmPassword: z
      .string()
      .describe("Confirm password")
      .min(6, "Password must be 6 characters minimum"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ListItemsType = {
  href: string;
  title: string;
  description: string;
}[];
