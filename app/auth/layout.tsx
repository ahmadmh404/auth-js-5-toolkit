const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-sky-500 to-blue-700">
      {children}
    </div>
  );
};

export default AuthLayout;
