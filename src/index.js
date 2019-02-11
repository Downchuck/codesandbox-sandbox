/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { render } from "react-dom";
import Widget from "./Widget";
import GetGui from "./GetGui";
import "./styles.css";

// getGui(): HTMLElement() => render(GetGui(...this._params));

/** 
const range = (start, end) =>
  Array.from({ length: end - start }, (v, k) => k + start);
*/

const rootHtmlElement = document.getElementById("root");
const App = Widget();

render(
  <App title="Example">
    <GetGui
      isFirstCell={true}
      resId="Test Result"
      index={1}
      onHover={a => console.log(a)}
    />
    <div>Executable Spec Presentation</div>
  </App>,
  rootHtmlElement
);
