import React from "react";
import {
  AccountData,
  ContractData,
  ContractForm
} from "drizzle-react-components";
import { Link } from 'react-router-dom'
import KyberSwap from "./KyberSwap";


export default ({ accounts, children }) => (
  <div className="App">
    <nav className="uk-navbar-container uk-navbar-transparent" uk-navbar="true">
      <div className="uk-navbar-right">
        <ul className="uk-navbar-nav">
          <li className="uk-active">
            <Link to="/about">About</Link>
          </li>
          <li className="uk-active">
            <Link to="contact">Contact Us</Link>
          </li>
          <li>
            <KyberSwap></KyberSwap>
          </li>
        </ul>
      </div>
    </nav>
    {children}
    {/* footer yaha */}
  </div>
);
