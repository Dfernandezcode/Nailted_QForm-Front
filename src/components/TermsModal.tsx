import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import { useState } from "react";
import "../styles/components/TermsModal.scss";

const TermsModal = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      <a
        className="modal__link"
        color="fontColors.secondary"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Términos y condiciones
      </a>
      <Modal isOpen={isOpen} onClose={handleClose} motionPreset="slideInBottom" closeOnOverlayClick={true}>
        <ModalOverlay />
        <ModalContent m={5} className="modal__content">
          <ModalHeader className="modal__content--header">Términos y condiciones</ModalHeader>
          <ModalBody>
            Al aceptar los términos y condiciones, aceptas todas las cláusulas incluidas en este documento, el cual es un acuerdo legal entre la empresa y tú, como usuario.
            <br />
            <br />
            El uso de nuestro servicio está sujeto a las siguientes condiciones:
            <br />
            <br />
            1. Tú serás responsable de mantener la confidencialidad de cualquier información de acceso a tu cuenta.
            <br />
            2. No podrás utilizar nuestro servicio para fines ilegales o no autorizados.
            <br />
            3. No podrás utilizar nuestro servicio para enviar spam o correo no deseado.
            <br />
            <br />
            Estas son solo algunas de las cláusulas incluidas en los términos y condiciones. Para obtener el texto completo, consulta el documento adjunto.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TermsModal;
