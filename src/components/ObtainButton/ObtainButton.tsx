import { useNavigate } from "react-router-dom";
import "./ObtainButton.scss";

const ObtainButton = (): React.JSX.Element => {
  const navigate = useNavigate();

  const handleFunction = (): void => {
    navigate("/more-info");
  };
  return (
    <div className="obtainbtn-container">
      <button className="obtainbtn-container__obtain" onClick={handleFunction}>
        OBTÉN MÁS INFORMACIÓN
      </button>
    </div>
  );
};

export default ObtainButton;
