import { z } from "zod"

export const UserFormValidation = z.object({
    name: z.string()
    .min(2, {message: "Username must be at least 2 characters."})
    .max(50, {message: "Username must not be more than 50 characters."}),
    email: z.string()
    .email({message: "Invalid email address."}),
    Phone: z.string().refine((Phone) => /^\+?[1-9]\d{1,14}$/.test(Phone), {
        message: "Invalid phone number. Please enter a valid phone number.",
    }),
  })
  