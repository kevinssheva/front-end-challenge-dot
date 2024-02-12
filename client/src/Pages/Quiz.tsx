import { useEffect, useState } from "react";
import Layout from "../Layout";
import QuizComponent, { QuizProps } from "../components/QuizComponent";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Quiz = () => {
  const [data, setData] = useState<QuizProps[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [trueAnswers, setTrueAnswers] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [seconds, setSeconds] = useState(3000);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem("quizData");
      if (storedData) {
        setData(JSON.parse(storedData));
      } else {
        const response = await fetch("https://opentdb.com/api.php?amount=10");
        const data = await response.json();
        setData(data?.results);
        localStorage.setItem("quizData", JSON.stringify(data?.results));
      }

      const storedProgress = localStorage.getItem("quizProgress");
      if (storedProgress) {
        const { currentQuestion, trueAnswers, seconds } =
          JSON.parse(storedProgress);
        setCurrentQuestion(currentQuestion);
        setTrueAnswers(trueAnswers);
        setSeconds(seconds);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds === 0) {
        setIsFinished(true);
        localStorage.removeItem("quizData");
        localStorage.removeItem("quizProgress");
      }
      !isLoading && setSeconds((prev) => prev - 1);
    }, 10);
    return () => clearInterval(interval);
  });

  const handleAnswer = (answer: string) => {
    if (answer === data?.[currentQuestion - 1].correct_answer) {
      setTrueAnswers((prev) => prev + 1);
    }
    if (currentQuestion === 10) {
      setIsFinished(true);
      localStorage.removeItem("quizData");
      localStorage.removeItem("quizProgress");
    } else {
      setCurrentQuestion((prev) => prev + 1);
      localStorage.setItem(
        "quizProgress",
        JSON.stringify({
          currentQuestion: currentQuestion + 1,
          trueAnswers,
          seconds,
        })
      );
    }
  };
  return (
    <Layout>
      <div
        className={`absolute h-[0.6rem] top-0 left-0 overflow-hidden inset-x-0 bg-sky-200 `}
      >
        <div
          className="h-full bg-sky-700 rounded-r-md transition-all"
          style={{
            width: `${(currentQuestion / 10) * 100}%`,
          }}
        ></div>
      </div>
      <div className="w-full">
        {isFinished ? (
          <div className="w-full">
            <p className="text-center text-lg">Score</p>
            <h1 className="text-center font-bold text-[2.5rem] text-[#171717] leading-tight">
              {(trueAnswers / 10) * 100}
            </h1>
            <div className="flex flex-col gap-1 mt-5">
              <div className="flex justify-between font-semibold text-gray-500">
                <p>Total Question</p>
                <p className="text-black">10</p>
              </div>
              <div className="flex justify-between font-semibold text-gray-500">
                <p>Correct Answer</p>
                <p className="text-black">{trueAnswers}</p>
              </div>
              <div className="flex justify-between font-semibold text-gray-500">
                <p>Wrong Answer</p>
                <p className="text-black">{currentQuestion - trueAnswers}</p>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <Link
                to={"/"}
                className="cursor-pointer py-2 px-5 bg-sky-500 font-semibold text-white rounded-xl flex items-center justify-center gap-1"
              >
                <FaChevronLeft />
                Back
              </Link>
            </div>
          </div>
        ) : isLoading ? (
          <div className="flex flex-row justify-center gap-2 py-20">
            <div className="w-3 h-3 rounded-full bg-sky-500 animate-bounce"></div>
            <div className="w-3 h-3 rounded-full bg-sky-500 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-3 h-3 rounded-full bg-sky-500 animate-bounce [animation-delay:-.5s]"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-2">
              <h1 className="mb-2 text-gray-500">
                Question {currentQuestion}
                /10
              </h1>
              <div className="w-12 aspect-square bg-white flex items-center justify-center rounded-full relative">
                {seconds >= 1500 && (
                  <div
                    className="w-1/2 left-1/2 h-full absolute bg-sky-300 rounded-r-full origin-left transition-all duration-1000 ease-linear"
                    style={{
                      rotate: `${(3000 - seconds) * 0.12}deg`,
                    }}
                  ></div>
                )}
                <div
                  className="w-1/2 right-1/2 h-full absolute bg-sky-300 rounded-l-full origin-right transition-all duration-1000 ease-linear"
                  style={{
                    rotate: `${(1500 - seconds) * 0.12}deg`,
                  }}
                ></div>
                {seconds >= 1500 && (
                  <div className="w-1/2 right-1/2 h-full absolute bg-sky-300 rounded-l-full"></div>
                )}
                {seconds < 1500 && (
                  <div className="w-1/2 left-1/2 h-full absolute bg-white rounded-r-full"></div>
                )}
                <div className="bg-white absolute w-[75%] aspect-square rounded-full left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center">
                  <p>{Math.floor(seconds / 100)}</p>
                </div>
              </div>
            </div>
            {data && (
              <QuizComponent
                {...data[currentQuestion - 1]}
                handleAnswer={handleAnswer}
              />
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Quiz;
