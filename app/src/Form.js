import React, { Component } from "react";
import './App.css'

class Form extends Component {
  render() {
    return (
      <div className="section">
        <form class="uk-form-stacked">
          <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text">
              Name
            </label>
            <div class="uk-form-controls">
              <input
                class="uk-input"
                id="form-stacked-text"
                type="text"
                placeholder="Some text..."
              />
            </div>
          </div>

          <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-select">
              Select
            </label>
            <div class="uk-form-controls">
              <select class="uk-select" id="form-stacked-select">
                <option>Option 01</option>
                <option>Option 02</option>
              </select>
            </div>
          </div>
          <div className="uk-margin">
            <div uk-switcher="animation: uk-animation-fade; toggle: > *">
              <button class="uk-button uk-button-default highlight" type="button">
                Item
              </button>
              <button class="uk-button uk-button-default highlight" type="button">
                Item
              </button>
              <button class="uk-button uk-button-default highlight" type="button">
                Item
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
