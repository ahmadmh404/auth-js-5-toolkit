"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { loginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAUTL_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "@/lib/tokens";

import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/email";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (
  values: z.infer<typeof loginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid Fields!" };

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  //  if the user didn't verify their email then we will block them
  if (!existingUser.emailVerified) {
    if (code) {
      const twoFActorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFActorToken) return { error: "Inalid code!" };

      console.log("code: ", { token: code, dbToken: twoFActorToken.token });

      if (twoFActorToken.token !== code) return { error: "Invalid code!" };

      const hasExpired = new Date(twoFActorToken.expires) < new Date();

      if (hasExpired) return { error: "Code expired!" };

      // remove two-factor-toekn

      await db.twoFactorToken.delete({
        where: { id: twoFActorToken.id },
      });

      // create the two-factor-confirmation to let the user login
      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      const newConfirmation = await db.twoFactorConfirmation.create({
        data: { userId: existingUser.id },
      });

      console.log("newConfirmation: ", { newConfirmation });

      return { success: "Two factor enabled!" };
    } else {
      const verificationToken = await generateVerificationToken(
        existingUser.email
      );

      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );

      return { success: "Confirmation email sent!" };
    }
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    const twoFactorToken = await generateTwoFactorToken(existingUser.email);

    await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

    return { twoFactor: true };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAUTL_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };

        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
