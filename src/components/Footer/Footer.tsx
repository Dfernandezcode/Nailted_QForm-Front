import logo_blue from "../../assets/img/nailted_logo-blue.svg";
import "./Footer.scss";

const Footer = (): React.JSX.Element => {
  return (
    <>
      <footer className="nailted__footer">
        <a href="https://nailted.com/" target="_blank" rel="noopener noreferrer">
          <img className="nailted__footer-logo" src={logo_blue} alt="Nailted" />
        </a>
      </footer>
    </>
  );
};

export default Footer;
