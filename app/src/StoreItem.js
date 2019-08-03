import React from "react";
import { drizzleConnect } from "drizzle-react";
import "./App.css";

const StoreItem = ({ data }) => (
  <div>
    <div
      className="uk-card uk-align-center uk-card-hover uk-margin-top uk-border-rounded uk-box-shadow-large uk-padding-small uk-card-default"
      onClick={() => {}}
    >
      <div className="uk-margin-top-small">
        <img src={data.media} alt={data.name} width="225px" height="225px" />
      </div>
      <h3 className="uk-card-title uk-margin-remove-bottom">
        {data.name}
      </h3>
      <p className="uk-text-meta uk-margin-remove-top">
        {data.description}
      </p>
    </div>
  </div>
);

export default drizzleConnect(StoreItem, (state, props) => {
  return {
    DonatETH: state.contracts.DonatETH,
    accounts: state.accounts,
    drizzle: props.drizzle,
    drizzledata: props.drizzledata
  };
});
