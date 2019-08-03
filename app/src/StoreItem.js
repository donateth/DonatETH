import React from "react";
import "./App.css";

export default ({ item }) => (
  <div class="uk-card uk-card-default uk-width-1-3@m">
    <div class="uk-card-header uk-padding-remove">
      <div class="uk-grid-small uk-flex-middle" uk-grid>
        <div class="uk-width-auto">
          <img src={item.image} alt="Avatar" />
        </div>
        <div class="uk-width-expand uk-margin-small-left">
          <h3 class="uk-card-title uk-margin-remove-bottom">{item.title}</h3>
          <p class="uk-text-meta uk-margin-remove-top">{item.description}</p>
        </div>
      </div>
    </div>
  </div>
);
