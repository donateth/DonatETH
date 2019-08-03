import React from "react";
import { drizzleConnect } from "drizzle-react";
import "./App.css";

const StoreItem = (props) => (
  <div>
    <div
      className="uk-card uk-align-center uk-card-hover uk-margin-top uk-border-rounded uk-box-shadow-large uk-padding-small uk-card-default"
      onClick={() => props.data.history.push(`store/${props.data.storeItem.storeId}`)}
    >
      <div className="uk-margin-top-small">
        <img src={props.data.storeItem.image} alt={props.data.storeItem.title} width="225px" />
      </div>
      <h3 className="uk-card-title uk-margin-remove-bottom">
        {props.data.storeItem.title}
      </h3>
      <p className="uk-text-meta uk-margin-remove-top">
        {props.data.storeItem.description}
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
