/* eslint-disable no-undef */
import { fireEvent, render, screen } from "@testing-library/react";
import ResultsbyMail from "./ResultsByMail";
import { HashRouter } from "react-router-dom";
import ObtainButton from "../components/ObtainButton/ObtainButton";

describe("Result component", () => {
  test("search the title page", () => {
    render(
      <HashRouter>
        <ResultsbyMail/>
      </HashRouter>
    );
    const title = screen.getByText("RESULTADOS");
    expect(title).toBeInTheDocument();
  });
  test("search the button and click function", () => {
    render(
      <HashRouter>
        <ResultsbyMail>
          <ObtainButton/>
        </ResultsbyMail>
      </HashRouter>
    );
    const button = screen.getByText("OBTÉN MÁS INFORMACIÓN");
    expect(button).toBeInTheDocument();
    fireEvent.click(button)
  });
});
