import React from "react";
import { useState } from "react";
import { nanoid } from "nanoid";

export default function Question(props) {

    const displayAnswers = props.choices.map(choice => {

        let buttonClasses = "option preventSelect"

        if (props.reviewStage) {

            buttonClasses += " disabled";

            if (props.chosenAnswer === choice) {
                if (props.chosenAnswer === props.correctAnswer) {
                    buttonClasses += " correct";
                } else {
                    buttonClasses += " incorrect";
                }
            } else {
                if (choice === props.correctAnswer) {
                    buttonClasses += " wasCorrect";
                }
            }
        } else if (props.chosenAnswer === choice) {
            buttonClasses += " pressed";
        }

        return (<button
            key={nanoid()}
            className={buttonClasses}
            onClick={() => props.handleChoiceClick(props.question, choice)}>
            {choice}
        </button>)
    })



    return (
        <div className="question">
            <p>{props.question}</p>
            <div className="options">
                {displayAnswers}
            </div>
            <hr className="separator" />
        </div>
    )
}