"use client";
import { UserInfo } from "@/components/user-info";
import { useCurrentuser } from "@/hooks/use-current-user";

const ClientPage = () => {
  const user = useCurrentuser();

  return <UserInfo user={user} label="💻 Client Componenet" />;
};

export default ClientPage;
