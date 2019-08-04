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
      hi!
    </>
  );
};
export default StoreDetail;
