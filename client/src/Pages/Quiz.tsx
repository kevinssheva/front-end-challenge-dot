import { useEffect, useState } from "react";
import Layout from "../Layout";
import QuizComponent, { QuizProps } from "../components/QuizComponent";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Quiz = () => {
  const [data, setData] = useState<QuizProps[]>();
  // const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [trueAnswers, setTrueAnswers] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

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
    };
    fetchData();

    const storedProgress = localStorage.getItem("quizProgress");
    if (storedProgress) {
      const { currentQuestion, trueAnswers } = JSON.parse(storedProgress);
      setCurrentQuestion(currentQuestion);
      setTrueAnswers(trueAnswers);
    }
  }, []);

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
        })
      );
    }
  };
  console.log(data);
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
                <p className="text-black">{10 - trueAnswers}</p>
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
        ) : (
          <>
            <h1 className="mb-2 text-gray-500">
              Question {currentQuestion}
              /10
            </h1>
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
