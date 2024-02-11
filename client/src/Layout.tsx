const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-sky-500 flex items-center justify-center">
      <div className="w-full max-w-lg bg-[#EEEEEE] shadow-md rounded-xl py-10 px-[3%] relative overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default Layout;
