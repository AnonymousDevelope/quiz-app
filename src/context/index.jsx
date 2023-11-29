import { Suspense, useState, createContext } from "react";

export const QuizContext = createContext();

// eslint-disable-next-line react/prop-types
export const QuizContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]); // Ensure questions are initialized as an array
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  return (
    <Suspense fallback={<h1>Loading . . .</h1>}>
      <QuizContext.Provider
        value={{
          loading,
          setLoading,
          questions,
          setQuestions,
          name,
          setName,
          score,
          setScore,
        }}
      >
        {children}
      </QuizContext.Provider>
    </Suspense>
  );
};
