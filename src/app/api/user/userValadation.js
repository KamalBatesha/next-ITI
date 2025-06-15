import mongoose from "mongoose";
import { z } from "zod";

export const addUserValadation=z.object({
    name:z.string().min(2).max(15),
    email:z.string().email(),
    city:z.string(),
    street:z.string(),
    suite:z.string()
})
export const editUserValadation = z.object({
  id: z.custom((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "_id must be a valid MongoDB ObjectId",
  }),
  name: z.string().min(2).max(15).optional(),
  email: z.string().email().optional(),
  city: z.string().optional(),
  street: z.string().optional(),
  suite: z.string().optional(),
});