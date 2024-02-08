const Title = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-3xl font-black">Quizdot</h1>
      <p>Get Ready to Challenge Your Knowledge!</p>
      <button className="w-full bg-[#29AA00] rounded-lg font-semibold text-lg text-white py-3 mt-auto hover:bg-[#447e32] transition-all">
        Challenge Yourself!
      </button>
    </div>
  );
};

export default Title;
