import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import DepartmentsListView from "./DepartmentsListView";

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

it("render PersonalPage", () => {
  act(() => {
    render(<DepartmentsListView />, container);
  });
  const h1 = document.querySelector("h1");
  expect(h1.textContent).toBe("List of Departments");
});