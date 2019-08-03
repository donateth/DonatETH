import React, { useEffect, useState } from "react";
import "./App.css";
import { drizzleConnect } from "drizzle-react";
import StoreItem from './StoreItem'

const Stores = props => {
  const [stores, setStores] = useState({});
  useEffect(() => {
    const total = props.drizzle.contracts.DonatETH.methods
      .getAllStores()
      .call()
      .then(total => {
        const data = {};
        console.log({ total });
        for (let i = 1; i <= total; i++) {
          console.log(i);
          props.drizzle.contracts.DonatETH.methods
            .getStore(i)
            .call()
            .then(store => {
              data[i] = store;
              console.log(store);
              if (i === total - 1) {
                setStores(data);
                console.log(data);
              }
            });
        }
      });

    // return () => {
    //     cleanup
    // };
  }, []);

  return (
    <>
      <h1 className="uk-text-center">Karma Forests</h1>
      <div
        className="stores uk-child-width-1-4@m uk-margin-top-large uk-text-center uk-grid"
        uk-grid
      >
        {Object.keys(stores).map(store => {
          const data = stores[store];
          return <StoreItem key={store.storeId} data={data} />;
        })}
      </div>
    </>
  );
};

export default drizzleConnect(Stores, (state, props) => {
  return {
    DonatETH: state.contracts.DonatETH,
    accounts: state.accounts,
    drizzle: props.drizzle,
    drizzleStore: props.drizzleStore
  };
});
