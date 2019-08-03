import React, { Component } from "react";
import "./App.css";
import { drizzleConnect } from "drizzle-react";
import StoreItem from "./StoreItem";
import { sampleStoreItem } from "./Constants";

class Stores extends Component {

  componentDidMount() {
    const storeCount = this.props.drizzle;
    const stackID = this.props.drizzle.contracts.DonatETH.methods.getStore(storeId);
  }

  render() {
    const props = {...this.props, stores: sampleStoreItem}
    return (
      <>
        <h1 className="uk-text-center">Karma Forests</h1>
        <div
          className="stores uk-child-width-1-4@m uk-margin-top-large uk-text-center uk-grid"
          uk-grid
        >
          {props.stores.map((store) => {
            const data = { ...props, storeItem: store };
            return <StoreItem key={store.storeId} data={data} />;
          })}
        </div>
      </>
    );
  }
}

export default drizzleConnect(Stores, (state, props) => {
  return {
    DonatETH: state.contracts.DonatETH,
    accounts: state.accounts,
    drizzle: props.drizzle,
    drizzleStore: props.drizzleStore
  };
});
