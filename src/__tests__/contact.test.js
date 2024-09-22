import { render, screen } from "@testing-library/react";
import Contactus from "../Components/ContactUs";
import "@testing-library/jest-dom";

// it and test are all same 
describe("Test vcases for Contactus", () => {
  it("checking the heading ", () => {
    render(<Contactus />);
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });
  test("checking the button ", () => {
    render(<Contactus />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
  test("checking the button text ", () => {
    render(<Contactus />);

    const button = screen.getByText("Submit");
    expect(button).toBeInTheDocument();
  });
  test("checking the input ", () => {
    render(<Contactus />);
    const button = screen.getByPlaceholderText("Name");
    expect(button).toBeInTheDocument();
  });
  test("checking theinput ", () => {
    render(<Contactus />);

    //   Querying
    const input = screen.getAllByRole("textbox");
    // button returns jsx of the input element here , the whole object of input element
    // console.log(input.length);
    //   Assertion
    expect(input.length).toBe(1);
  });
});
