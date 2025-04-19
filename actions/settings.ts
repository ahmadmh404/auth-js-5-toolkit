"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { settingsSchema } from "@/schemas/index";
import { getUserByEmail, getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/email";
import { generateVerificationToken } from "@/lib/tokens";

export const settings = async (values: z.infer<typeof settingsSchema>) => {
  const user = await currentUser();

  if (!user?.id) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || !dbUser.id) {
    return { error: "Unauthorized" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  // check if the email entreed is not the same or belong to another user
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in user!" };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Verification email sent!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordsMatch) return { error: "Incorrect password!" };

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  });

  return { success: "Settings updated!" };
};
