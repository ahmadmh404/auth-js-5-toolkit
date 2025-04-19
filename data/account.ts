import { db } from "@/lib/db";

/**
 * This util is used to change the settings content based if the user is OAuth
 * signed in cause he can't jsut update his password cuz no password for him
 * in the database and the email cannot be
 * updated cuz it's linked with an Account
 *
 * @param userId string
 */

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: { userId },
    });

    return account;
  } catch (error) {
    return null;
  }
};
