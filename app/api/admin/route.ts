import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

import { toast } from "react-hot-toast";

export async function GET() {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    toast.success("You're Allowed Sir 😎");
    return new NextResponse(null, { status: 200 });
  }

  toast.success("You're not Allowed normal user 😜");

  return new NextResponse(null, { status: 403 });
}
