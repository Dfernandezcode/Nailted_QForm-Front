import React, { useContext, useEffect, useState } from "react";
import { Divider } from "@chakra-ui/react";
import CategoryResult from "../components/CategoryResults";
import GlobalResult from "../components/GlobalResult";
import "../styles/layouts/Results.scss";
import { InfoContext } from "../App";
import LoadingComponent from "../components/LoadingComponent";
import ObtainButton from "../components/ObtainButton/ObtainButton";

const Results = (): React.JSX.Element => {
  const infoContext = useContext(InfoContext);
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  const API_URL_GET_FEEDBACK = `${process.env.REACT_APP_API_URL as string}/submission/get-feedback/${infoContext?.submissionId}`;

  useEffect(() => {
    if (infoContext?.submissionId) {
      setLoadingFeedback(true);
      getFeedback();
    }
  }, [infoContext?.submissionId]);

  const getFeedback = (): void => {
    fetch(API_URL_GET_FEEDBACK)
      .then(async (response) => {
        if (response.status !== 200) {
          alert("Ha ocurrido un error en la petición");
        }
        return await response.json();
      })
      .then((responseParsed) => {
        infoContext?.setFeedback(responseParsed);
        setLoadingFeedback(false);
      })
      .catch((error) => {
        alert("Ha ocurrido un error en la petición");
        console.error(error);
        setLoadingFeedback(false);
      });
  };

  if (loadingFeedback) {
    return <LoadingComponent />;
  }

  return (
    <div className="results-page">
      <h1 className="results-page__heading">RESULTADOS</h1>
      <Divider className="results-page__divider" />
      <div className="results-page__container">
        <GlobalResult global={infoContext?.feedback?.global} />
        <Divider className="results-page__divider" />
        <div className="results-page__categories">
          {infoContext?.feedback?.categories.map((category) => {
            return <CategoryResult key={category.name} name={category.name.toUpperCase()} maxPoints={category.maxPoints} points={category.points} feedback={category.feedback} />;
          })}
        </div>
        <Divider className="results-page__divider" />
        <ObtainButton />
      </div>
    </div>
  );
};

export default Results;
