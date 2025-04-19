"use server";

import { db } from "@/lib/db";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { getUserByEmail } from "@/data/user";

export const newVerificationToken = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) return { error: "Token does not exist!" };

  const hasexpired = existingToken.expires < new Date();

  if (hasexpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  // Somehow the user changed it's email bettwen sending the verification email and clicking the url (Wierd Scenario)
  if (!existingUser) return { error: "Email does not exist!" };

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),

      // This update to the users after updating the email inthe settings.
      email: existingUser.email,
    },
  });

  // after verifying the user we will delete the existing token
  await db.verification.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified" };
};
