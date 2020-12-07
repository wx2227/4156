import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import AddCourse from "../src/components/AddCourse";
import { mount, shallow } from 'enzyme'
import AddCourseView from '../src/components/AddCourseView'

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn()
  }),
}));

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

describe('test add course button', () => {

  it("render button if admin", () => {
    act(() => {
      render(<AddCourse />, container);
    });
    const button = document.querySelector("Button");
    expect(button.innerHTML).toBe("+ Add Course");
  });

  it ('submit button work', () => {

    const onClickSpy = jest.fn();
    let wrapper = mount(<AddCourse onClick={onClickSpy}/>)

    wrapper.find('#button').find('button').simulate('click')

    expect(onClickSpy).toHaveBeenCalled()
  })
})