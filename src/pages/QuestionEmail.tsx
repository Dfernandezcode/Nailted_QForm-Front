import { Text, Alert, AlertIcon, Input, Switch, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { useState, useContext, useRef } from "react";
import { InfoContext } from "../App";
import "../styles/layouts/QuestionEmail.scss";
import LoadingComponent from "../components/LoadingComponent";
import SentModal from "../components/SentModal";
import TermsModal from "../components/TermsModal";

const QuestionEmail = (): React.JSX.Element => {
  const infoContext = useContext(InfoContext);

  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);

  const API_URL_ADD_USERMAIL_TO_SUBMISSION = `${process.env.REACT_APP_API_URL as string}/submission/add-email-to-submission-and-send-pdf`;

  const sendMailToSubmission = (): void => {
    setIsLoading(true);
    fetch(API_URL_ADD_USERMAIL_TO_SUBMISSION, {
      method: "PATCH",
      body: JSON.stringify({ userMail: infoContext?.userMail, submissionId: infoContext?.submissionId }),
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    })
      .then(async (response) => {
        return await response.json();
      })
      .catch((error) => {
        console.error(error);
        alert("Ha ocurrido un error en la petición");
      })
      .finally(() => {
        setIsLoading(false);
        setIsModalOpen(true);
      });
  };

  const handleButtonClick = (): void => {
    setShowAlert(false);
    setIsTermsAccepted(false);
    const isEmailValid = isValidEmail(infoContext?.userMail);

    if (!isEmailValid || !isTermsAccepted) {
      setShowAlert(true);
      setAlertMessage("Por favor, proporciona un correo electrónico válido y acepta los términos y condiciones.");
    } else {
      sendMailToSubmission();
    }
  };

  const handleSwitchChange = (): void => {
    setIsTermsAccepted(!isTermsAccepted);
    setShowAlert(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    infoContext?.setUserMail(event.target.value);
    setShowAlert(false);
  };

  const isValidEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleModalClose = (): void => {
    setIsModalOpen(false);
  };

  return (
    <div className="email-page">
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="email-page__content-title">
            <h1 className="email-page__content-title--header">Quieres un informe más detallado?</h1>
            <p className="email-page__content-title--subtext">Podemos enviarte una copia (PDF) para que puedas leerlo cuando te resulte conveniente.</p>
            <p className="email-page__content-title--cta">¿A dónde lo enviamos?</p>
          </div>

          <div className="email-page__content-input">
            <Input className="email-page__input" ref={emailRef} variant="flushed" width="300px" color="fontColors.tertiaryFont" placeholder="Introduce tu correo electrónico." onChange={handleEmailChange} value={infoContext?.userMail} />
            {showAlert && (
              <Alert display="flex" status="error" h="75px" maxW="500px" minW="300px" borderRadius="10px" mt="25px">
                <AlertIcon />
                <Text>{alertMessage}</Text>
              </Alert>
            )}

            <div className="email-page__content-input--terms">
              <Switch color="fontColors.quaternary" size="md" onChange={handleSwitchChange} />
              <TermsModal />
            </div>
            <div className="email-page__content-send">
              <button className="email-page__content-send--btn" onClick={handleButtonClick}>
                Envíame el informe.
              </button>
            </div>
          </div>

          <Modal closeOnOverlayClick={true} isOpen={isModalOpen} onClose={handleModalClose}>
            <ModalOverlay />
            <ModalContent m={5} h="90vh">
              <ModalCloseButton mt="5px" fontSize={20} color="#a7a9bc" />
              <ModalBody>
                <SentModal />
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  );
};

export default QuestionEmail;
