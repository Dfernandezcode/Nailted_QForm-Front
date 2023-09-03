import { SelectButtonProps } from "../../models/types";
import "./selectButton.scss";

const SelectButton = ({ name, type, value, isChecked, onChange }: SelectButtonProps): React.JSX.Element => {
  return type === "radio" ? (
    <div className="select-button">
      <input type={type} id={`radio-${value.toLocaleLowerCase()}`} name={name} value={value} onChange={onChange} checked={isChecked} />
      <label htmlFor={`radio-${value.toLocaleLowerCase()}`}>{value}</label>
    </div>
  ) : (
    <div className="select-button">
      <input type={type} id={name.toLocaleLowerCase()} value={value} onChange={onChange} checked={isChecked} />
      <label htmlFor={name.toLocaleLowerCase()}>{value}</label>
    </div>
  );
};

export default SelectButton;
