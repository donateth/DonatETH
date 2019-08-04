import React from "react";
import {
  AccountData,
  ContractData,
  ContractForm
} from "drizzle-react-components";
import { Link } from "react-router-dom";
import KyberSwap from "./KyberSwap";
import logo from "./logo.png";

const RootComponent = ({ accounts, children, drizzle, drizzleStore }) => (
  <div className="App">
    <nav className="uk-navbar-container uk-navbar-transparent" uk-navbar="true">
      <div className="uk-navbar-left">
        <a class="uk-text-bold uk-text-middle uk-navbar-item uk-logo" href="/">
          <img src={logo} className="nav-logo" width="52px"></img>
          DonatETH
        </a>
      </div>
      <div className="uk-navbar-right">
        <ul className="uk-navbar-nav">
          <li className="uk-active">
            <Link to="/about">About</Link>
          </li>
          <li className="uk-active">
            <Link to="contact">Contact Us</Link>
          </li>
          <li>
            <KyberSwap />
          </li>
        </ul>
      </div>
    </nav>
    {children}
    <footer class="uk-footer uk-align-center uk-text-center">
      <hr />
      <p className="uk-text-emphasis uk-text-middle"> &copy; Team DonatETH </p>
    </footer>
  </div>
);

export default RootComponent;
