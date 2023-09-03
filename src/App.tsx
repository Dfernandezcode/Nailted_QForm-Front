import React, { useState, useEffect, createContext, Suspense, useMemo } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

import Home from "./pages/Home";
import Question from "./pages/Question";
import Results from "./pages/Results";
import QuestionEmail from "./pages/QuestionEmail";
import LoadingComponent from "./components/LoadingComponent";

import { InfoContextData, Feedback, IQuestion } from "./models/types";
import ResultsByMail from "./pages/ResultsByMail";

const API_URL_QUESTIONS = `${process.env.REACT_APP_API_URL as string}/form/last-version`;

export const InfoContext = createContext<InfoContextData>({
  userMail: "",
  submissionId: "",
  feedback: {
    submissionId: "",
    global: {
      maxPoints: 0,
      points: 0,
      globalFeedback: [],
    },
    categories: [],
  },
  setSubmissionId: function (submissionId: string): void {
    throw new Error("Function not implemented.");
  },
  setUserMail: function (userMail: string): void {
    throw new Error("Function not implemented.");
  },
  setFeedback: function (feedback: Feedback): void {
    throw new Error("Function not implemented.");
  },
});

const App = (): React.JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState<IQuestion[]>([]);
  const [idForm, setIdForm] = useState<string>("");
  const [submissionId, setSubmissionId] = useState<string>("");
  const [userMail, setUserMail] = useState("");
  const [feedback, setFeedback] = useState<Feedback>({
    submissionId: "",
    global: {
      maxPoints: 0,
      points: 0,
      globalFeedback: [],
    },
    categories: [],
  });

  const getQuestions = (): void => {
    fetch(API_URL_QUESTIONS)
      .then(async (response) => {
        if (response.status !== 200) {
          alert("Ha ocurrido un error en la petición");
        }
        return await response.json();
      })
      .then((responseParsed) => {
        setQuestionList(responseParsed.questions);
        setIdForm(responseParsed._id);
      })
      .catch((error) => {
        alert("Ha ocurrido un error en la petición");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const contextValue = useMemo(() => {
    return {
      userMail,
      setUserMail,
      submissionId,
      setSubmissionId,
      feedback,
      setFeedback,
    };
  }, [userMail, setUserMail, submissionId, setSubmissionId, feedback, setFeedback]);

  return (
    <HashRouter>
      <div className="App">
        {loading && <LoadingComponent />}
        {!loading && (
          <div className="content-wrapper">
            <ChakraProvider>
              <CSSReset />
              <AnimatePresence mode="wait">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2 }}>
                  <InfoContext.Provider value={contextValue}>
                    <Suspense fallback={<LoadingComponent />}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/form" element={<Question questionList={questionList} idForm={idForm} />} />
                        <Route path="/results" element={<Results />} />
                        <Route path="/results-by-mail/:id" element={<ResultsByMail />} />
                        <Route path="/more-info/" element={<QuestionEmail />} />
                      </Routes>
                    </Suspense>
                  </InfoContext.Provider>
                </motion.div>
              </AnimatePresence>
            </ChakraProvider>
          </div>
        )}
      </div>
    </HashRouter>
  );
};

export default App;
