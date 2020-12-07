import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import DeleteNote from "../src/components/DeleteNote";
import { mount } from 'enzyme'
import AddNote from '../src/components/AddNote'

jest.mock('axios', () => {
  return {
    delete: jest.fn(() => Promise.resolve())
  };
});

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn()
  }),
}));

const axios = require('axios')

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

it("render PersonalPage fail", () => {
  act(() => {
    render(<DeleteNote note={testProps2}/>, container);
  });
  const div = document.querySelector("div");
  expect(div.innerHTML).toBe("<div></div>");
});

it("render PersonalPage", () => {
  act(() => {
    render(<DeleteNote note={testProps1}/>, container);
  });
  const Button = document.querySelector("Button");
  expect(Button.innerHTML).toBe(" Delete File ");
});

describe('test delete note button', () => {

  it ('delete note button work', () => {

    const onClickSpy = jest.fn();
    let wrapper = mount(<DeleteNote onClick={onClickSpy} note={testProps1}/>)

    wrapper.find('#button').find('button').simulate('click')

    expect(onClickSpy).toHaveBeenCalled()
    expect(axios.delete).toHaveBeenCalled()
  })

  it ('delete note button work', () => {

    const onClickSpy = jest.fn();
    let wrapper = mount(<DeleteNote onClick={onClickSpy} note={testProps1}/>)

    wrapper.find('#button').find('button').simulate('click')

    expect(onClickSpy).toHaveBeenCalled()
    expect(axios.delete).toHaveBeenCalled()
  })

  it ('delete note button work', () => {

    const onClickSpy = jest.fn();
    let wrapper = mount(<DeleteNote onClick={onClickSpy} note={testProps1}/>)

    axios.delete.mockRejectedValueOnce(new Error('error'));

    wrapper.find('#button').find('button').simulate('click')

    expect(onClickSpy).toHaveBeenCalled()
    expect(axios.delete).toHaveBeenCalled()
  })
})