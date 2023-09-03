import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { InputProps, typeEnum } from "../../models/types";
import "./input.scss";
import { useCallback } from "react";

const Input = ({ question, value, onChange, onKeyPress }: InputProps): React.JSX.Element => {
  const onKeyArrow = (isUp: boolean): void => {
    const inputNumber = document.getElementById(question._id) as HTMLInputElement;
    if (Number(inputNumber.value) >= 0 && isUp) {
      inputNumber.stepUp();
    }

    if (Number(inputNumber.value) > 0 && !isUp) {
      inputNumber.stepDown();
    }

    onChange(inputNumber.id, inputNumber.value);
  };

  const arrowOnUp = useCallback(
    (event: any) => {
      event.preventDefault();
      onKeyArrow(true);
    },
    [question]
  );

  const arrowOnDown = useCallback(
    (event: any) => {
      event.preventDefault();
      onKeyArrow(false);
    },
    [question]
  );

  return (
    <div className="input__wrapper">
      {question.type === typeEnum.number && (
        <button className="input__buttons input__buttons--left" onClick={arrowOnDown}>
          <FaMinusSquare />
        </button>
      )}
      <input
        className="input__element"
        id={question._id}
        type={question.type}
        placeholder={question.placeholder}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(event.target.id, event.target.value);
        }}
        onKeyDown={onKeyPress}
      />
      {question.type === typeEnum.number && (
        <button className="input__buttons input__buttons--right" onClick={arrowOnUp}>
          <FaPlusSquare />
        </button>
      )}
    </div>
  );
};

export default Input;
