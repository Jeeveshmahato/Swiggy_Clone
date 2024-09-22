import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import data from "../mocks/CardList.json";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import Menu from "../Components/Menu";
import "@testing-library/jest-dom";
import Header from "../Components/Header";
import Cart from "../Components/Cart";
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(data),
  })
);

it("should open my lists", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Menu />
          <Header />
          <Cart />
        </Provider>
      </BrowserRouter>
    )
  );
  const MenuCatList = screen.getByText("Cheese Volcano(8)");
  expect(MenuCatList).toBeInTheDocument();
  fireEvent.click(MenuCatList);
  const lists = screen.getAllByTestId("foodItems");
  expect(lists.length).toBe(8);
  const addbutton = screen.getAllByRole("button", { name: "Add +" });
  fireEvent.click(addbutton[0]);
  const carth = screen.getByText("Cart - 1 items");
  expect(carth).toBeInTheDocument();
  const listafterclick = screen.getAllByTestId("foodItems");
  expect(listafterclick.length).toBe(9);
  const removebutton = screen.getByRole("button", { name: "Clear Cart" });
  fireEvent.click(removebutton);
  const cartempty = screen.getByText("Please add items to the card");
  expect(cartempty).toBeInTheDocument();
});
