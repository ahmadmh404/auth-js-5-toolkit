import { Navbar } from "./_componenets/navbar";
import { Toaster } from "react-hot-toast";

interface ProtectedLayoutProsp {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProsp) => {
  return (
    <div className="w-full h-screen flex flex-col gap-y-10 items-center justify-center bg-gradient-to-b from-sky-500 to-blue-700">
      <Navbar />
      {children}
      <Toaster />
    </div>
  );
};

export default ProtectedLayout;
