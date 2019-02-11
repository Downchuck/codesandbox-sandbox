/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const DivOnHoverSpanContent = ({ css, onMouseEnter, content }) => (
  <div {...{ css, onMouseEnter }}>
    <span>{content}</span>
  </div>
);

export default (
  { resId, index, isFirstCell, onHover },
  ctx,
  { css, onMouseEnter } = {}
) =>
  DivOnHoverSpanContent({
    css: css || {
      visibility: isFirstCell || (index + 1) % 10 === 0 ? "visible" : "hidden",
      className: isFirstCell ? "ssv-first-header-cell" : undefined
    },
    onMouseEnter: onMouseEnter || (() => onHover(index)),
    content: resId
  });
