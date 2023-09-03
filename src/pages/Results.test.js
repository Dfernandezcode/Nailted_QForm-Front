/* eslint-disable no-undef */
import { fireEvent, render, screen } from "@testing-library/react";
import Results from "./Results";
import { HashRouter } from "react-router-dom";
import GlobalResult from "../components/GlobalResult";
import ObtainButton from "../components/ObtainButton/ObtainButton";

describe("Result component", () => {
  test("search the page", () => {
    render(
      <HashRouter>
        <Results/>
      </HashRouter>
    );
    const title = screen.getByText("RESULTADOS");
    expect(title).toBeInTheDocument();
  });
  test("search the title results", () => {
    render(
      <HashRouter>
        <Results>
          <GlobalResult></GlobalResult>
        </Results>
      </HashRouter>
    );
    const title = screen.getByText("GLOBAL");
    expect(title).toBeInTheDocument();
  });
  test("search the button and click function", () => {
    render(
      <HashRouter>
        <Results>
          <ObtainButton/>
        </Results>
      </HashRouter>
    );
    const button = screen.getByText("OBTÉN MÁS INFORMACIÓN");
    expect(button).toBeInTheDocument();
    fireEvent.click(button)
  });
});
