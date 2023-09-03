import React, { useContext, useState, useEffect } from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "../styles/layouts/Question.scss";
import { AnswerType, QuestionComponentProps, Submission, typeEnum } from "../models/types";
import Button from "../components/Button/button";
import SelectButton from "../components/SelectButton/selectButton";
import { InfoContext } from "../App";
import { motion } from "framer-motion";
import Input from "../components/Input/input";
import ProgressBar from "../components/ProgressBar";

type selectedOptionsProps = Record<string, AnswerType>;

const API_URL_SUBMISSION = `${process.env.REACT_APP_API_URL as string}/submission/create-submission`;

const QuestionComponent = ({ questionList, idForm }: QuestionComponentProps): React.JSX.Element => {
  const navigate = useNavigate();

  const progressBarCount = 100 / questionList.length;

  const [counterQuestion, setCounterQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<selectedOptionsProps>({});
  const [showError, setShowError] = useState<boolean>(false);
  const [progressBar, setProgressBar] = useState<number>(0);

  const [initialTransition, setInitialTransition] = useState<string>("50vh");

  const infoContext = useContext(InfoContext);

  useEffect(() => {
    setProgressBar(progressBarCount * counterQuestion);
  }, [counterQuestion, progressBarCount]);

  const transformData = (): Submission => {
    return {
      form: idForm,
      answers: Object.values(selectedOptions),
    };
  };

  const sendSubmission = (): void => {
    fetch(API_URL_SUBMISSION, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transformData()),
    })
      .then(async (response) => {
        if (response.status !== 201) {
          alert("Ha ocurrido un error en la petición");
        }
        return await response.json();
      })
      .then((responseParsed) => {
        navigate("/results");
        infoContext?.setSubmissionId(responseParsed._id);
      })
      .catch((error) => {
        alert("Ha ocurrido un error en la petición");
        console.error(error);
      });
  };

  const handleNextQuestion = (): void => {
    if (counterQuestion < questionList.length - 1) {
      if (isQuestionAnswered()) {
        setCounterQuestion(counterQuestion + 1);
        setShowError(false);
        setInitialTransition("50vh");
      } else {
        setShowError(true);
      }
    }
  };

  const handlePreviousQuestion = (): void => {
    if (counterQuestion > 0) {
      setCounterQuestion(counterQuestion - 1);
      setShowError(false);
      setInitialTransition("-50vh");
    }
  };

  const handleChangeOption = (option: string, id: string): void => {
    const isSelected = selectedOptions[id] ? selectedOptions[id]?.answer.includes(option) : false;

    if (isSelected) {
      const options = selectedOptions[id].answer.filter((item) => item !== option);

      setSelectedOptions({
        ...selectedOptions,
        [questionList[counterQuestion]._id]: {
          answer: options,
          question_text: questionList[counterQuestion].question_text,
        },
      });
    } else {
      const newOptions = [...(selectedOptions[id] ? selectedOptions[id].answer : []), option];
      setSelectedOptions({
        ...selectedOptions,
        [id]: {
          answer: newOptions,
          question_text: questionList[counterQuestion].question_text,
        },
      });
    }
  };

  const isQuestionAnswered = (): boolean => {
    const currentQuestion = questionList[counterQuestion];
    const isValue = selectedOptions[currentQuestion._id] && selectedOptions[currentQuestion._id].answer[0] !== "";

    if (currentQuestion.type === typeEnum.text || currentQuestion.type === typeEnum.number) {
      return Boolean(isValue);
    }

    if (currentQuestion.type === typeEnum.radio) {
      return Boolean(isValue);
    }

    if (currentQuestion.type === typeEnum.checkbox) {
      return Boolean(selectedOptions[currentQuestion._id] && selectedOptions[currentQuestion._id].answer.length > 0);
    }

    return false;
  };

  const handleSendForm = (): void => {
    if (isQuestionAnswered()) {
      sendSubmission();
    } else {
      setShowError(true);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleNextQuestion();
    }
  };

  const handleOnChange = (id: string, value: any): void => {
    setSelectedOptions({
      ...selectedOptions,
      [id]: {
        answer: [value],
        question_text: questionList[counterQuestion].question_text,
      },
    });
  };

  const isRadioElement = (): boolean => {
    return questionList[counterQuestion].type === typeEnum.radio;
  };

  return (
    <div className="question-box">
      {questionList.length > 0 && (
        <>
          <h1 className="question-box__category">{questionList[counterQuestion].category.name.toUpperCase()}</h1>
          <motion.div key={`motion-${questionList[counterQuestion]._id}`} initial={{ x: initialTransition, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.55, ease: "easeOut" }} className="question-box__wrapper">
            <form className={`question-box__div ${questionList[counterQuestion].type === typeEnum.radio || questionList[counterQuestion].type === typeEnum.checkbox ? "question-box__div--checkbox" : ""}`}>
              <label className="question-box__question">{questionList[counterQuestion].question_text}</label>
              <>
                {questionList[counterQuestion].type === typeEnum.radio || questionList[counterQuestion].type === typeEnum.checkbox ? (
                  <>
                    <p className="question-box__question-text">{questionList[counterQuestion].type === typeEnum.radio ? "Selecciona una opción" : "Puedes seleccionar varias opciones"}</p>

                    {(questionList[counterQuestion].type === typeEnum.radio || questionList[counterQuestion].type === typeEnum.checkbox) && (
                      <div className="question-box__direction">
                        {questionList[counterQuestion].options.map((option) => (
                          <SelectButton
                            key={option._id}
                            name={isRadioElement() ? questionList[counterQuestion]._id : option.name}
                            type={questionList[counterQuestion].type}
                            value={option.name.toLocaleUpperCase()}
                            isChecked={isRadioElement() ? selectedOptions[questionList[counterQuestion]._id]?.answer[0] === option.name : selectedOptions[questionList[counterQuestion]._id]?.answer.includes(option.name)}
                            onChange={() => {
                              isRadioElement() ? handleOnChange(questionList[counterQuestion]._id, option.name) : handleChangeOption(option.name, questionList[counterQuestion]._id);
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Input question={questionList[counterQuestion]} value={selectedOptions[questionList[counterQuestion]._id]?.answer[0] || ""} onChange={handleOnChange} onKeyPress={handleKeyPress} />
                )}
              </>
            </form>
          </motion.div>
        </>
      )}
      <div className="question-box__footer">
        <div className="question-box__buttons">
          <Button color="secondary" onClick={handlePreviousQuestion} text="Atrás" type="previous" disabled={counterQuestion === 0} />
          {counterQuestion !== questionList.length - 1 ? (
            <>
              <Button text="Siguiente" color="primary" onClick={handleNextQuestion} type="next" />
            </>
          ) : (
            <Button
              text="Finalizar"
              type="finish"
              onClick={handleSendForm}
            />
          )}
        </div>
        <div className="question-box__alert-wrapper">
          {showError && (
            <Alert className="question-box__alert" bg="bgColors.bgQuaternary" color="fontColors.secondaryFont" status="warning">
              <AlertIcon />
              Por favor, responde la pregunta antes de continuar.
            </Alert>
          )}
        </div>
        <p>
          Pregunta {counterQuestion + 1} de {questionList.length}
        </p>
        <ProgressBar value={progressBar}></ProgressBar>
      </div>
    </div>
  );
};

export default QuestionComponent;
