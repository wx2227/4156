import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import UploadForm from "../src/components/UploadForm";

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

it("render Preview", () => {
  // act(() => {
  //   render(<UploadForm />, container);
  // });
  // const h1 = document.querySelector("h1");
  // expect(h1.textContent).toBe("Add Your Note");
  //
  // const label = document.querySelectorAll("label");
  // expect(label.length).toBe(4);
  //
  // const button = document.querySelector("button");
  // expect(button.innerHTML).toBe("Submit");
});