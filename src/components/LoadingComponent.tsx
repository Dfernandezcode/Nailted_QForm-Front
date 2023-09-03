import BarLoader from "react-spinners/BarLoader";
import "../styles/components/LoadingComponent.scss";
import logo_blue from "../assets/img/nailted_logo-blue.svg";

const LoadingComponent = (): React.JSX.Element => {
  return (
    <div className="loader-container">
      <img className="loader-container__logo" src={logo_blue} alt="Nailted" />
      <BarLoader color="#179BF6" width="200px" aria-label="Loading Spinner" data-testid="loader" />
    </div>
  );
};
export default LoadingComponent;
