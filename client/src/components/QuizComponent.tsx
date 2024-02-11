export interface QuizProps {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

interface QuizComponentProps {
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
  handleAnswer: (answer: string) => void;
}

const QuizComponent = ({
  correct_answer,
  incorrect_answers,
  question,
  handleAnswer,
}: QuizComponentProps) => {
  const answers = [correct_answer, ...incorrect_answers].sort(
    () => Math.random() - 0.5
  );
  return (
    <div className="w-full">
      <h1 className="font-semibold text-lg">
        {question
          .replace(/&quot;/gi, '"')
          .replace(/&#039;/gi, "'")
          .replace(/&amp;/gi, "&")
          .replace(/&rsquo;/gi, "'")
          .replace(/&shy;/gi, "-")}
      </h1>
      <div className="flex flex-col w-full gap-3 mt-4">
        {answers.map((answer, index) => (
          <button
            key={index}
            className="bg-white rounded-lg shadow-sm py-4 flex items-center gap-3 px-3 group hover:bg-sky-300 hover:scale-[103%] transition"
            onClick={() => handleAnswer(answer)}
          >
            <p className="rounded-full bg-sky-700 font-semibold w-6 aspect-square text-white flex items-center justify-center">
              {String.fromCharCode(index + 65)}
            </p>
            <p>{answer}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizComponent;
