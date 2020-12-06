import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import AddNote from "./AddNote";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("render button if admin", () => {
  act(() => {
    render(<AddNote />, container);
  });
  const button = document.querySelector("Button");
  expect(button.innerHTML).toBe("+ Add Note");
});