import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import DeleteNote from "../src/components/DeleteNote";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  Object.defineProperty(window.document, 'cookie', {
    writable: true,
    value: 'user_id=1',
  });
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const testProps1 = {user_id: 1};
const testProps2 = {user_id: 2};

it("render PersonalPage", () => {
  act(() => {
    render(<DeleteNote note={testProps1}/>, container);
  });
  const Button = document.querySelector("Button");
  expect(Button.innerHTML).toBe(" Delete File ");
});

it("render PersonalPage fail", () => {
  act(() => {
    render(<DeleteNote note={testProps2}/>, container);
  });
  const div = document.querySelector("div");
  expect(div.innerHTML).toBe("<div></div>");
});