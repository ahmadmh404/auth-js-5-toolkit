import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-5">
      <h2 className={cn("text-3xl font-semibold", font.className)}>🔐 Auth</h2>

      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
