import { render ,screen } from "@testing-library/react";
import Card from "../Components/Card";
import cardmock from "../mocks/cardmock.json";
import '@testing-library/jest-dom'
import { RatCard } from "../Components/Card";

it("should have data in card", () => {
  render(<Card data={cardmock} />);
  const name = screen.getByText("World bar |||")
  expect(name).toBeInTheDocument();
});
it("should have data in card", () => {
    render(<Card data={cardmock} />);
    const rate = screen.getByText("5.0")
    const rated= screen.getByText("5")
    expect(rate).toBeInTheDocument();
    expect(rated).toBeInTheDocument();
  });
  