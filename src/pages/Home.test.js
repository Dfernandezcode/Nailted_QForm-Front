/* eslint-disable no-undef */
import { fireEvent, render, screen } from "@testing-library/react";
import StarBtn from "../components/StartBtn";
import { HashRouter } from "react-router-dom";
import Description from "../components/Description";

describe("Home component", () => {
  test("Search Description", () => {
    render(
      <HashRouter>
        <Description />
      </HashRouter>
    );
    const title = screen.queryByText(/Entiende mejor tu empresa/i);
    expect(title).toBeInTheDocument();
  });

  test("search the button and click function", () => {
    render(
      <HashRouter>
        <StarBtn />
      </HashRouter>
    );
    const button = screen.getByText("EMPEZAR");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });
});
