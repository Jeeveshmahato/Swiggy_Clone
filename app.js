const heading = React.createElement("div", { id: "parent" }, [
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", { id: "head" }, "Hello mai aaya"),
    React.createElement("h2", { id: "head2" }, "Hello mai aaya 2"),
  ]),
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", { id: "head" }, "Hello mai aaya"),
    React.createElement("h2", { id: "head2" }, "Hello mai aaya 2"),
  ]),
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(heading);
