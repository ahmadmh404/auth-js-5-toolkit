"use client";

import { admin } from "@/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import toast from "react-hot-toast";

const AdminPage = () => {
  const onAPIRouteClick = () => {
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("You're Allowed Sir 😎");
      } else {
        toast.error("You're not Allowed normal user 😜");
      }
    });
  };

  const onSerActionClick = () => {
    admin().then((data) => {
      if (data.error) console.error(data.error);
      if (data.success) console.log(data.success);
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader className="text-2xl font-semibold text-center">
        <p>🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You're allowed to see this content!" />
        </RoleGate>

        <div className="flex items-center justify-between p-3 rounded-lg shadow-md">
          <p className="text-sm font-medium">Admin only API Route</p>

          <Button onClick={onAPIRouteClick}> Click to test!</Button>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg shadow-md">
          <p className="text-sm font-medium">Admin only server actions</p>

          <Button onClick={onSerActionClick}>Click to test!</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
