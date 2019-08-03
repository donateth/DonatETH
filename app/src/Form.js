import React, { useState } from "react";
import { drizzleConnect } from "drizzle-react";

import Button from './Button'

import './App.css'

const RegisterForm = (props) => {
  const [stackId, setStackId] = useState('')

  const registerUser = () => {
    const name = document.querySelector('#name').value
    const email = document.querySelector('#email').value
    const username = document.querySelector('#username').value
    const userType = document.querySelector('#user-type').value

    const data = {name, email, username, userType}
    console.log(data)
    const stackID = props.drizzle.contracts.DonatETH.methods.createUser.cacheSend(name, email, username, userType, {
      from: props.accounts[0]
    });
    
    console.log(stackId)
  }

  // const getTxStatus = () => {
  //   const { transactions, transactionStack } = this.props.drizzleState;

  //   const txHash = transactionStack[stackId];
  //   if(!txHash) return null;

  //   return `Transaction status: ${transactions[txHash].status}`; 
  // }
  return (
    <div className="section">
      <form onSubmit={(e) => {
        e.preventDefault()
        registerUser()
      }} className="uk-form-stacked">
        <div className="uk-margin">
          <label className="uk-form-label">
            Name
          </label>
          <div className="uk-form-controls">
            <input
              className="uk-input"
              type="text"
              id="name"
              placeholder="Your name"
            />
          </div>
        </div>

        <div className="uk-margin">
          <label className="uk-form-label" >
            Email
          </label>
          <div className="uk-form-controls">
            <input
              className="uk-input"
              id="email"
              type="email"
              placeholder="Your email"
            />
          </div>
        </div>

        <div className="uk-margin">
          <label className="uk-form-label" >
            Username
          </label>
          <div className="uk-form-controls">
            <input
              className="uk-input"
              id="username"
              type="text"
              placeholder="Your username"
            />
          </div>
        </div>

        <div className="uk-margin">
          <label className="uk-form-label" >
            Select your type
          </label>
          <div className="uk-form-controls">
            <select className="uk-select" id="user-type">
              <option value="0">MANAV</option>
              <option value="1">DOOT</option>
              <option value="2">DAATA</option>
            </select>
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
        <Button text="Register" type="secondary" ></Button>
      </form>
    </div>
  );
}

export default drizzleConnect(RegisterForm, (state, props) => {
  return {
    DonatETH: state.contracts.DonatETH,
    accounts: state.accounts,
    drizzle: props.drizzle,
    drizzleStore: props.drizzleStore
  }
});
