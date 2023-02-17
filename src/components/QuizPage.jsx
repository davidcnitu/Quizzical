import React from "react";
import { useState, useEffect } from "react";
import Question from "./Question";

export default function QuizPage() {

    const [fetchQuestions, setFetch] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [reviewStage, setReviewStage] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    //Extract questions and answers from API:
    useEffect(() => {
        fetch("https://the-trivia-api.com/api/questions?limit=5")
            .then(response => response.json())
            .then(json => {
                setQuestions(json.map(item => {
                    return ({
                        key: item.id,
                        question: item.question,
                        correctAnswer: item.correctAnswer,
                        choices: shuffleChoices([...item.incorrectAnswers, item.correctAnswer]),
                        chosenAnswer: ""
                    })
                }))
            });
    }, [fetchQuestions])

    //Fisher-Yates shuffling algorithm
    function shuffleChoices(choicesArray) {
        for (let i = choicesArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = choicesArray[i];
            choicesArray[i] = choicesArray[j];
            choicesArray[j] = temp;
            return choicesArray;
        }
    }

    function handleChoiceClick(value, choice) {
        setQuestions(prevQuestions => prevQuestions.map(item => {
            if (item.question === value) {
                return ({ ...item, chosenAnswer: choice })
            } else {
                return ({ ...item })
            }
        }))
    }

    function checkAnswers() {

        let goodAnswers = 0;

        questions.forEach(item => {
            if (item.chosenAnswer === item.correctAnswer) {
                goodAnswers += 1;
            }
        })

        setCorrectAnswers(goodAnswers);
        setReviewStage(true);
    }

    function playAgain() {
        setQuestions([]);
        setReviewStage(false);
        setCorrectAnswers(0);
        setFetch(prev => !prev);
    }

    const displayQuestions = questions.map(item => {
        return (
            <Question
                key={item.key}
                question={item.question}
                correctAnswer={item.correctAnswer}
                choices={item.choices}
                chosenAnswer={item.chosenAnswer}
                updateQuestions={item.updateQuestions}
                handleChoiceClick={handleChoiceClick}
                reviewStage={reviewStage}
            />)
    })
    return (
        <div className="QuizPage">
            {displayQuestions}
            <div className="footer">
                {reviewStage ? [<div className="review"><p>{`You scored ${correctAnswers}/5 correct answers!`}</p>
                    <button className="submitButton" onClick={playAgain}>Play again!</button></div>
                ] : <button className="submitButton" onClick={checkAnswers}>Check answers!</button>}
            </div>
        </div>
    );
}