import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import appStore from "../utils/appStore";
import Header from "../Components/Header";

it("should in the header", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const button = screen.getByRole("button", { name: "Login" });
  expect(button).toBeInTheDocument();
});
it("should in the Cart header", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const button = screen.getByText(/Cart/);
  expect(button).toBeInTheDocument();
});
it("should in the login to logoutheader", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const loginbutton = screen.getByText("Login");
  fireEvent.click(loginbutton)
  const logoutbutton = screen.getByText("Logout");

  expect(loginbutton).toBeInTheDocument();
});