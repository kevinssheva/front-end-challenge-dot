import axios from "axios";
import Layout from "../Layout";
import { AiFillEdit } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoExitOutline } from "react-icons/io5";

const Welcome = () => {
  const handleStart = () => {
    localStorage.removeItem("quizData");
    localStorage.removeItem("quizProgress");
  };

  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");

  const getUser = async () => {
    if (!localStorage.getItem("isAuthenticated")) return;
    const response = await axios.get("http://localhost:3001/user", {
      withCredentials: true,
    });
    setUsername(response.data.name);
    setIsLogin(true);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res);
      localStorage.removeItem("isAuthenticated");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const quizProgress = localStorage.getItem("quizProgress");
  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-center justify-center gap-5">
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
      <div className="flex justify-center mt-5">
        {isLogin ? (
          <div className="flex px-2 border-2 border-black rounded-full items-center py-1">
            <div className="flex gap-2">
              <IoPersonCircleOutline size={24} />
              <p className="text-black">
                Hi,{" "}
                <span className="font-semibold">{username.split(" ")[0]}</span>
              </p>
            </div>
            <div className="h-4 w-[1px] bg-black mx-2"></div>
            <div
              className="flex gap-2 hover:scale-105 transition-all items-center justify-center rounded-r-full cursor-pointer text-red-500"
              onClick={handleLogout}
            >
              {/* <p className="text-sm">Logout</p> */}
              <IoExitOutline size={22} />
            </div>
          </div>
        ) : (
          <Link
            to={"/join"}
            className="underline cursor-pointer text-sm hover:text-sky-500 transition-all"
          >
            Login to your account
          </Link>
        )}
      </div>
    </Layout>
  );
};

export default Welcome;
