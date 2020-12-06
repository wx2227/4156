import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import AddCourse from "./AddCourse";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  Object.defineProperty(window.document, 'cookie', {
    writable: true,
    value: 'admin=true',
  });
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("render button if admin", () => {
  act(() => {
    render(<AddCourse />, container);
  });
  const button = document.querySelector("Button");
  expect(button.innerHTML).toBe("+ Add Course");
});

it("not render button if not admin", () => {
  Object.defineProperty(window.document, 'cookie', {
    writable: true,
    value: 'admin=false',
  });
  act(() => {
    render(<AddCourse />, container);
  });
  const button = document.querySelector("Button");
  expect(button).toBeNull();
});