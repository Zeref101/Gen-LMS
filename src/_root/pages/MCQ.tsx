import { useState, useEffect } from "react";
import "./mcq.css";
import { useParams } from "react-router-dom";
import { fetchquiz } from "@/lib/backend/User";
import { DocumentData } from "firebase/firestore";
import axios from "axios";

const MCQ = () => {
  const { quizID } = useParams();
  const [data, setData] = useState<DocumentData | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean>(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number>(0);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  useEffect(() => {
    async function fetch() {
      if (quizID) {
        const fetchedData = await fetchquiz(quizID);
        setData(fetchedData);
        if (fetchedData && "questions" in fetchedData) {
          setQuestions(fetchedData.questions);
          console.log(data);
        }
      }
    }
    fetch();
  }, [quizID]);

  const onClickNext = () => {
    console.log(selectedAnswerIndex + 1);
    setAnswers((prev) => [
      ...prev,
      selectedAnswerIndex+1,
    ]);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setTimeout(() => {
        setActiveQuestion(0);
        console.log({
          quiz_id: quizID,
          student_id: "wfPc1lDadJcMcID4Nyyz",
          saved_answers: answers,
          name: "Python",
        });
        axios
          .post("http://192.168.47.237:8000/save_student_answers/", {
            quiz_id: quizID,
            student_id: "wfPc1lDadJcMcID4Nyyz",
            saved_answers: answers,
            name: "Python",
          })
          .then((response) => {
            // Handle success
            console.log("Data saved successfully", response.data);
          })
          .catch((error) => {
            // Handle error
            console.error("Error saving data:", error);
          });
        setShowResult(true);
      }, 1000);
    }
  };

  const onAnswerSelected = (answer: string, index: number) => {
    setSelectedAnswerIndex(index);
    console.log(
      answer,
      questions[activeQuestion].choices[
        questions[activeQuestion].correct_answer - 1
      ]
    );

    if (
      questions[activeQuestion].choices[
        questions[activeQuestion].correct_answer - 1
      ] === answer
    ) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const addLeadingZero = (number: number) =>
    number > 9 ? number : `0${number}`;

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div>
          <div>
            <span className="active-question-no">
              {addLeadingZero(activeQuestion + 1)}
            </span>
            <span className="total-question">
              /{addLeadingZero(questions.length)}
            </span>
          </div>
          <h2>{questions[activeQuestion]?.question}</h2>
          <ul>
            {questions[activeQuestion]?.choices.map(
              (answer: string, index: number) => (
                <li
                  onClick={() => onAnswerSelected(answer, index)}
                  key={answer}
                  className={
                    selectedAnswerIndex === index
                      ? "selected-answer"
                      : undefined
                  }
                >
                  {answer}
                </li>
              )
            )}
          </ul>
          <div className="flex-right">
            <button
              onClick={onClickNext}
              disabled={selectedAnswerIndex === null}
            >
              {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Question: <span>{questions.length}</span>
          </p>
          <p>
            Total Score:<span> {result.score}</span>
          </p>
          <p>
            Correct Answers:<span> {result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers:<span> {result.wrongAnswers}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default MCQ;
