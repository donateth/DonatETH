import React from "react";

export default  ({ moreClasses, type, text }) => (
  <button className={`uk-button-${type} uk-button ${moreClasses} uk-border-pill uk-margin-right`}>
    {text}
  </button>
);
