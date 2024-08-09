import React from "react";
import ReactDOM from "react-dom/client";

const heading = React.createElement("h1", { id: "heading" }, "Hello World");
// JSX => Babel transpile it ReactCreateElement => React(Object) => HtmlElement
const Jsxhead = (
  <h1 className="" tabIndex={1}>
    Hello World
  </h1>
);
// JSX in multiple lines- () helps babel to undertasnd where the code starts annd where it's ends

const Jsxheadmulti = (
  <h1 className="" tabIndex={1}>
    Hello World
  </h1>
);
const HeadCom = function()  {
  
  return <h1>Hello World HeadCom</h1>;
  <Head/>
};
// Component composition- calling other components in other components
// loop of copoents just for fun😂😂😂
const Head = () => {
  return (
    <div>
      {funcon()}
      <h1 id="heading">Hello World Head</h1>
    </div>
  );
};
const funcon = function() {
  return (
    <div>
      <h1 id="heading">Hello World Funcon</h1>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Head />);

// ReactDOM.render(React.createElement('h1', { id: 'heading' }, 'Hello World'), document.getElementById('root'));
