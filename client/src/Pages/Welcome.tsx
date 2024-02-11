import Layout from "../Layout";
import { AiFillEdit } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const Welcome = () => {
  const handleStart = () => {
    localStorage.removeItem("quizData");
    localStorage.removeItem("quizProgress");
  };
  const quizProgress = localStorage.getItem("quizProgress");
  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-center justify-center gap-10">
        <div className="text-center">
          <h1 className="text-3xl font-black">Quizdot</h1>
          <p>Get Ready to Challenge Your Knowledge!</p>
        </div>
        <div className="flex w-full gap-2">
          <Link
            to={"/quiz"}
            className="flex-1 bg-sky-500 rounded-xl font-semibold text-lg text-white py-3 transition-all flex justify-center items-center gap-2"
            onClick={handleStart}
          >
            <AiFillEdit />
            Challenge Yourself!
          </Link>
          {quizProgress && (
            <Link
              to={"/quiz"}
              className="border-[3px] font-semibold border-sky-500 rounded-xl text-sky-500 px-4 flex items-center justify-center gap-2"
            >
              <FaPlay size={15} />
              Resume
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Welcome;
