import Title from "./components/Title";

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-[#77DD77] flex items-center justify-center">
      <div className="w-[35%] h-[65%] overflow-y-auto bg-[#EEEEEE] shadow-md rounded-lg py-10 px-[3%]">
        <Title />
      </div>
    </div>
  );
}

export default App;
