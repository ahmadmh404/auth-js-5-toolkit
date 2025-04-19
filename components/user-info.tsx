import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface UserInfoProsps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProsps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-lg border shadow-sm">
          <p className="text-sm font-medium">ID:</p>
          <p className="truncate text-xs max-w-[200px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.id}
          </p>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border shadow-sm">
          <p className="text-sm font-medium">Username:</p>
          <p className="truncate text-xs max-w-[200px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.name}
          </p>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border shadow-sm">
          <p className="text-sm font-medium">Email:</p>
          <p className="truncate text-xs max-w-[200px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.email}
          </p>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border shadow-sm">
          <p className="text-sm font-medium">Role:</p>
          <p className="truncate text-xs max-w-[200px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.role}
          </p>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border shadow-sm">
          <p className="text-sm font-medium">Two Factor:</p>
          <p className="truncate text-xs max-w-[200px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
