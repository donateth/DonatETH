import React from "react";

export default  ({ moreClasses, type, text, onClick }) => (
  <button className={`uk-button-${type} uk-button ${moreClasses} uk-border-pill uk-margin-right`} onClick={() => onClick && onClick()}>
    {text}
  </button>
);
