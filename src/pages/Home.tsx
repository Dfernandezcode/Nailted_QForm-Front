import React, { useState, useEffect } from "react";
import Description from "../components/Description";
import StartBtn from "../components/StartBtn";
import logo_blue from "../assets/img/nailted_logo-blue.svg";
import bgSplash from "../assets/img/home_large.jpg";
import "../styles/layouts/Home.scss";
import LoadingComponent from "../components/LoadingComponent";

const Home = (): React.JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImageLoaded(!imageLoaded);
      setLoading(false);
    };
    image.src = bgSplash;
  }, []);

  return (
    <div className={`landing-page ${loading ? "loading" : "loaded"}`}>
      {loading && <LoadingComponent />}
      {!loading && (
        <>
          <img className="landing-page__background-img" src={bgSplash} alt="Background" />
          <div className="landing-page__content">
            <div className="landing-page__content-box">
              <img className="landing-page__content-box--logo-blue" src={logo_blue} alt="Nailted" />
              <Description />
            </div>
            <StartBtn />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
