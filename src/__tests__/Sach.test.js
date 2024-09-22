import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Body from "../Components/Body";
import Mock_Data from "../mocks/mockbodydata.json";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(Mock_Data);
    },
  });
});

it("should have Search button in body component", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );
  // Checking before search
  const cardsBeforeSearch = screen.getAllByTestId("resCard");

  expect(cardsBeforeSearch.length).toBe(9);
  const cards = screen.getAllByTestId("resCard");
//   // console.log(cards.length);
//   expect(cards.length).toBe(1);
  const searchbutton = screen.getByRole("button", { name: "Search" });

  expect(searchbutton).toBeInTheDocument();
});

it("should have burger in body component", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );
  const cardsBeforeSearch = screen.getAllByTestId("resCard");
  expect(cardsBeforeSearch.length).toBe(9);
  const searchbutton = screen.getByRole("button", { name: "Search" });
  const searchInput = screen.getByTestId("searchInput");
  fireEvent.change(searchInput, { target: { value: "pizza" } });
  fireEvent.click(searchbutton);
  const cardsAfterSearch = screen.getAllByTestId("resCard");

    expect(cardsAfterSearch.length).toBe(1);
});

it("should  display best restaurants in body component", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );
  const bestbutton = screen.getByTestId("best_btn");
  // console.log(bestbutton);
  fireEvent.click(bestbutton);
  const cards = await screen.findAllByTestId("resCard");
  // console.log(cards.length);
  expect(cards.length).toBe(3);
});
