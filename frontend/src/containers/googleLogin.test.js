import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import GoogleButton from "./googleLogin";

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

it("render google login button", () => {
  // act(() => {
  //   render(<GoogleButton />, container);
  // });
  // const title = document.getElementById("title");
  // expect(title.textContent).toBe("AirNote");
  //
  // const googleButton = document.querySelector("GoogleLogin");
  // expect(googleButton).not.toBeNull();
});