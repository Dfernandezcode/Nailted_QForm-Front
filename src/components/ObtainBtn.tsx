import { useNavigate } from "react-router-dom";
import "../styles/components/ObtainBtn.scss";

const ObtainBtn = (): React.JSX.Element => {
  const navigate = useNavigate();

  const handleFunction = (): void => {
    navigate("/more-info");
  };

  return (
    <div className="obtain-btn-container">
      <button className="obtain-btn-container__obtain" onClick={handleFunction}>
        OBTÉN MÁS INFORMACIÓN
      </button>
    </div>
  );
};

export default ObtainBtn;
