import React from "react";
import { useState } from "react";
import QuizPage from "./components/QuizPage";
import StartPage from "./components/StartPage";

export default function App() {

    const [quizStarted, setQuizStarted] = useState(false);

    return (
        <main className="main">
            {quizStarted ? <QuizPage quizStarted /> : <StartPage setQuizStarted={setQuizStarted} />}
        </main>
    )
}