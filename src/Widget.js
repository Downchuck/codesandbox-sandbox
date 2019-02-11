import React, { useState } from "react";
import Markdown from "react-markdown";
import Logic from "./Logic";
import BDD from "./bdd.js";

const DefaultLogicImpl = () => Logic(useState(0));

const BDDResult = (
  {},
  context,
  { title, result, error, figure } = { ...BDD }
) => (
  <div>
    <div style={{ color: error ? "darkred" : "darkgreen" }}>{figure}</div>
    <pre>{title}</pre>
    <div>{result}</div>
    <pre>{error}</pre>
  </div>
);

// development toggle true/false
const Development = React.createContext(true);
const LogicTests = React.memo(() => (
  <div>
    <Markdown>{Logic.runReport()}</Markdown>
    <Markdown>{Logic.examples}</Markdown>
    <BDDResult />
  </div>
));

type WidgetInterface = {
  title: String,
  children: any
};
type LogicInterface = {
  count: Number,
  Increment: Function,
  Decrement: Function
};

const Widget = (LogicImpl = DefaultLogicImpl) => (
  { title, children }: WidgetInterface,
  legacyContext: any,
  { count, Increment, Decrement }: LogicInterface = LogicImpl()
) => (
  <div className="App">
    <h1>Sandbox {title}</h1>
    {children}
    <h2>You clicked {count} times!</h2>
    <button className="decrement" onClick={Decrement}>
      Decrement
    </button>
    <button className="increment" onClick={Increment}>
      Increment
    </button>
    <Development.Consumer>
      {development => (development ? <LogicTests /> : null)}
    </Development.Consumer>
  </div>
);

export default Widget;
