import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "../styles/layouts/SentModal.scss";
import email_icon from "../assets/img/email_icon.png";
import logo_blue from "../assets/img/nailted_logo-blue.svg";

const SentModal = (): React.JSX.Element => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      void controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="sent-page">
      <div className="sent-page__content">
        <motion.img ref={ref} className="sent-page__content--icon" src={email_icon} alt="Email Enviado!" initial="hidden" animate={controls} variants={containerVariants} />
        <motion.h1 className="sent-page__content--header" initial="hidden" animate={controls} variants={containerVariants}>
          Enviado!
        </motion.h1>
        <motion.h2 className="sent-page__content--subtext" initial="hidden" animate={controls} variants={containerVariants}>
          Lo recibirás en breve.
        </motion.h2>
      </div>
      <img className="sent-page__footer" src={logo_blue} alt="Nailted" />
    </div>
  );
};

export default SentModal;
