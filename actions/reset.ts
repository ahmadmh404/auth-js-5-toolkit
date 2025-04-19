"use server";

import * as z from "zod";
import { resetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/email";

export const reset = async (fields: z.infer<typeof resetSchema>) => {
  const vlaidatedFields = resetSchema.safeParse(fields);

  if (!vlaidatedFields.success) return { error: "Invalid email!" };

  const { email } = vlaidatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email)
    return { error: "Email not found!" };

  const passwordResetToken = await generatePasswordResetToken(
    existingUser.email
  );

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent!" };
};
