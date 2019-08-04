import React, { useEffect, useState } from "react";
import "./App.css";

const StoreDetail = props => {

  const [item, setItem] = useState({})

  const storeId = window.location.pathname.split('/')[2]
  useEffect(() => {
    const stackID = props.drizzle.contracts.DonatETH.methods
      .getStore(storeId)
      .call()
      .then(res => {
        const data = {};
        console.log(res);
        for (let i = 1; i <= res.itemCount; i++) {
          props.drizzle.contracts.DonatETH.methods
            .getStoreItem(i, storeId)
            .call()
            .then(apt => {
              data[i] = apt;
              console.log(apt);
              if (i === res - 1) {
                setItem(data);
              }
            });
        }
      });
    // return () => {
    //   cleanup
    // };
  }, [])
  
  return (
    <>
      <h2>Items</h2>
    <div className="uk-grid">
      <div>
        <div
          className="uk-card uk-align-center uk-card-hover uk-margin-top uk-border-rounded uk-box-shadow-large uk-padding-small uk-card-default"
          onClick={() => {}}
        >
          <div className="uk-margin-top-small">
            <img src='https://github.com/divyeshpuri.png'  width="225px" height="225px" />
          </div>
          <h3 className="uk-card-title uk-margin-remove-bottom">
            Thing 1
          </h3>
          <p className="uk-text-meta uk-margin-remove-top">
            This is product 1
          </p>
        </div>
      </div>

      <div>
        <div
          className="uk-card uk-align-center uk-card-hover uk-margin-top uk-border-rounded uk-box-shadow-large uk-padding-small uk-card-default"
          onClick={() => {}}
        >
          <div className="uk-margin-top-small">
            <img src='https://github.com/divyeshpuri.png'  width="225px" height="225px" />
          </div>
          <h3 className="uk-card-title uk-margin-remove-bottom">
            Item 2
          </h3>
          <p className="uk-text-meta uk-margin-remove-top">
            second item
          </p>
        </div>
      </div>

      <div>
        <div
          className="uk-card uk-align-center uk-card-hover uk-margin-top uk-border-rounded uk-box-shadow-large uk-padding-small uk-card-default"
          onClick={() => {}}
        >
          <div className="uk-margin-top-small">
            <img src='https://github.com/divyeshpuri.png'  width="225px" height="225px" />
          </div>
          <h3 className="uk-card-title uk-margin-remove-bottom">
            Item 3
          </h3>
          <p className="uk-text-meta uk-margin-remove-top">
            Third bank}
          </p>
        </div>

      </div>
    </div>
    </>
  );
};
export default StoreDetail;
