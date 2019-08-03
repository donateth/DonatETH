import React from "react";
import "./App.css";

export default ({ Item }) => (
  <div class="uk-card uk-card-default uk-width-1-3@m">
    <div class="uk-card-header uk-padding-remove">
      <div class="uk-grid-small uk-flex-middle" uk-grid>
        <div class="uk-width-auto">
          <img src={Item.image} alt="Avatar" />
        </div>
        <div class="uk-width-expand uk-margin-small-left">
          <h3 class="uk-card-title uk-margin-remove-bottom">{Item.title}</h3>
          <p class="uk-text-meta uk-margin-remove-top">{Item.description}</p>
        </div>
      </div>
    </div>
  </div>
);
