import { useNavigate } from "react-router-dom";
import "../styles/components/StartBtn.scss";

const StartBtn = (): React.JSX.Element => {
  const navigate = useNavigate();

  const handleFunction = (): void => {
    navigate("/form");
  };
  return (
    <div className="btn-container">
      <button className="btn-container__start" onClick={handleFunction}>
        EMPEZAR
      </button>
    </div>
  );
};

export default StartBtn;
