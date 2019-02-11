// import React from "react";
// enzyme deprecated for react-testing-library
/*
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
*/
// import { default as WidgetImpl } from "./Widget";
/*
// see also: https://github.com/pzavolinsky/react-cucumber
// too many options: https://github.com/kentcdodds/react-testing-library
// https://jestjs.io/docs/en/tutorial-react#dom-testing
```md
Scenario: As a Javier, I press a Decrement button, my count lowers by one
  Given a function $Decrement
  And a rendered <button onClick={$Decrement } />
  When the button.decrement calls props.Decrement with event { }
  Then the function $Decrement was called once
```
const { Given, When, Then } = require('cucumber');
import { StepDefinitions } from 'cucumber';
Given('a function $.')
// https://github.com/pzavolinsky/react-cucumber/blob/b2c96dfc106748e30914de74beb598040c987de9/src/steps.ts
  defs.Given(/^a function (\$\w+)(?: that returns (.*))?$/, fn);
  defs.Given(/^a function (\$\w+) that returns$/, fn);
*/
//Enzyme.configure({ adapter: new Adapter() });
// require("jest");
// oops
it("is an inline testing thing", () => {
  expect({ test: 1 }).toMatchSnapshot();
});

/*
it("Widget renders sorta", () => {
  let hasDecremented = false;
  const Widget = WidgetImpl(() => ({
    count: 10,
    Decrement: () => (hasDecremented = true)
  }));

  const widget = shallow(<Widget title="Test" />);
  expect(
    widget
      .find("button")
      .first()
      .simulate("click")
      .text()
  ).toEqual("Decrement");
  expect(hasDecremented).toEqual(true);

  expect(
    widget
      .find("button")
      .last()
      .text()
  ).toEqual("Increment");

  expect(
    widget
      .find("h1")
      .first()
      .text()
  ).toEqual("Sandbox Test");

  expect(
    widget
      .find("h2")
      .first()
      .text()
  ).toEqual("You clicked 10 times!");

  widget.find("button").first();
});
*/
