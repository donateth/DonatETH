import React, { useState, useEffect } from "react";
import { drizzleConnect } from "drizzle-react";

import Button from "../Button";

const AddItem = props => {
    const [stackId, setStackId] = useState("");

    const makeStore = () => {
        const name = document.querySelector("#name").value;
        const price = document.querySelector("#price").value;
        const media = document.querySelector("#media").value;
        const stackID = props.drizzle.contracts.DonatETH.methods.createItem.cacheSend(
            name,
            media,
            price,
            1,
            {
                from: props.accounts[0]
            }
        );

        console.log(stackId);
        props.history.push('stores')
    };

    // const getTxStatus = () => {
    //   const { transactions, transactionStack } = this.props.drizzleState;

    //   const txHash = transactionStack[stackId];
    //   if(!txHash) return null;

    //   return `Transaction status: ${transactions[txHash].status}`;
    // }
    return (
        <div className="section">
            <form
                onSubmit={e => {
                    e.preventDefault();
                    makeStore();
                }}
                className="uk-form-stacked"
            >
                <div className="uk-margin">
                    <label className="uk-form-label">Name</label>
                    <div className="uk-form-controls">
                        <input
                            className="uk-input"
                            type="text"
                            id="name"
                            placeholder="Enter item name"
                        />
                    </div>
                </div>

                <div className="uk-margin">
                    <label className="uk-form-label">Price</label>
                    <div className="uk-form-controls">
                        <input
                            className="uk-input"
                            type="text"
                            id="price"
                            placeholder="Item Price"
                        />
                    </div>
                </div>

                <div className="uk-margin">
                    <label className="uk-form-label">Item Image</label>
                    <div className="uk-form-controls">
                        <input
                            className="uk-input"
                            id="media"
                            type="media"
                            placeholder="Enter link to item image"
                        />
                    </div>
                </div>

                {/* <div className="uk-margin">
          <div uk-switcher="animation: uk-animation-fade; toggle: > *">
            <button class="uk-button uk-button-default highlight" type="button">
              Manav
            </button>
            <button class="uk-button uk-button-default highlight" type="button">
              Doot
            </button>
            <button class="uk-button uk-button-default highlight" type="button">
              Daata
            </button>
          </div>
        </div> */}
                <Button text="Create Item" type="secondary" />
            </form>
        </div>
    );
};

export default drizzleConnect(AddItem, (state, props) => {
    return {
        DonatETH: state.contracts.DonatETH,
        accounts: state.accounts,
        drizzle: props.drizzle,
        drizzleStore: props.drizzleStore
    };
});
