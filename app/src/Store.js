import React, { Component } from "react";
import "./App.css";

class Store extends Component {
  render() {
    return (
      <div className="section">
        <div class="uk-card uk-card-default uk-width-1-3@m">
          <div class="uk-card-header uk-padding-remove">
            <div class="uk-grid-small uk-flex-middle" uk-grid>
              <div class="uk-width-auto">
                <img
                  src="https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/1027242/2019/1/31/e53398db-46c3-40be-8390-41c91c398a931548915326598-ether-Men-Navy-Blue-Slim-Fit-Antimicrobial-Corduroy-Shirt-39-1.jpg"
                  alt="Avatar"
                />
              </div>
              <div class="uk-width-expand uk-margin-small-left">
                <h3 class="uk-card-title uk-margin-remove-bottom">Title</h3>
                <p class="uk-text-meta uk-margin-remove-top">
                  <time datetime="2016-04-01T19:00">April 01, 2016</time>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Store;
