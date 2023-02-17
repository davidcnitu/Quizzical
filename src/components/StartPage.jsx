import React from "react";

export default function StartPage(props) {
    return (
        <div className="startPage">
            <h1>Quizzical</h1>
            <p>Test your trivia knowledge!</p>
            <button
                className="submitButton"
                onClick={() => props.setQuizStarted(true)}>
                Start Quiz!</button>
        </div>
    );
}