// These hooks can be used inside all client side componenets

import { useSession } from "next-auth/react";

export const useCurrentuser = () => {
  const session = useSession();

  return session.data?.user;
};
