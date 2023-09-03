/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import QuestionEmail from "./QuestionEmail";
import TermsModal from "../components/TermsModal";

describe("QuestionEmail component", () => {
  test("search the page", () => {
    render(
      <HashRouter>
        <QuestionEmail>
        </QuestionEmail>
      </HashRouter>
    );
    const title = screen.queryByText("Quieres un informe mas detallado?");
    expect(title).toBeInTheDocument();
  });

  test("search the conditions", () => {
    render(
      <HashRouter>
        <QuestionEmail>
          <TermsModal />
        </QuestionEmail>
      </HashRouter>
    );
    const title = screen.getByText("Términos y condiciones");
    expect(title).toBeInTheDocument();
  });
});
