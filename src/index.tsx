import React from "react";
import ReactDOM from "react-dom";
// import backend from "react-dnd-html5-backend";
import backend from "react-dnd-mouse-backend";
import { DndProvider } from "react-dnd";
import App from "./App";

ReactDOM.render(
  <DndProvider backend={backend}>
    <App />
  </DndProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
