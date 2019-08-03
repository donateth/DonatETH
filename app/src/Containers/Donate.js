import React, { useState, useEffect } from "react";
import { drizzleConnect } from "drizzle-react";

import Button from "../Button";

const RegisterForm = props => {

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position)
            const pos = `${position.coords.latitude}, ${position.coords.longitude}`
            document.querySelector("#coor").value = pos;
        })

        // return () => {
        //     cleanup
        // };
    }, [])


    const [stackId, setStackId] = useState("");

    const registerUser = () => {
        // const coor = navigator.geolocation.getCurrentPosition(position => {
        //     console.log(position)
        //     return `${position.coords.latitude}, ${position.coords.longitude}`
        // })
        const qty = document.querySelector("#qty").value;
        const price = 0;
        const paid = false;
        const physicalAddress = document.querySelector("#paddr").value;
        const coor = document.querySelector("#coor").value;
        const initialDate = new Date() * 1
        const picker = '0x1b600483E6A0003b3841Fea87C47D8DA8A3681E4'
        const data = { qty, price, paid, physicalAddress, coor, initialDate };
        console.log(data);
        const stackID = props.drizzle.contracts.DonatETH.methods.setAppointment.cacheSend(
            picker,
            qty,
            price,
            paid,
            physicalAddress,
            coor,
            initialDate.toString(),
            {
                from: props.accounts[0]
            }
        );

        console.log(stackId);
        props.history.push('dashboard')
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
                    registerUser();
                }}
                className="uk-form-stacked"
            >
                <div className="uk-margin">
                    <label className="uk-form-label">Quantity</label>
                    <div className="uk-form-controls">
                        <input
                            className="uk-input"
                            type="text"
                            id="qty"
                            placeholder="Enter item quantity"
                        />
                    </div>
                </div>

                <div className="uk-margin">
                    <label className="uk-form-label">Physical Address</label>
                    <div className="uk-form-controls">
                        <input
                            className="uk-input"
                            type="text"
                            id="paddr"
                            placeholder="Your physical address"
                        />
                    </div>
                </div>

                <div className="uk-margin">
                    <label className="uk-form-label">Coordinates</label>
                    <div className="uk-form-controls">
                        <input
                            className="uk-input"
                            id="coor"
                            type="text"
                            placeholder="Your coordinates, for more accurate pickup"
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
                <Button text="Book Appointment" type="secondary" />
            </form>
        </div>
    );
};

export default drizzleConnect(RegisterForm, (state, props) => {
    return {
        DonatETH: state.contracts.DonatETH,
        accounts: state.accounts,
        drizzle: props.drizzle,
        drizzleStore: props.drizzleStore
    };
});
