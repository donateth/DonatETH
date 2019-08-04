import React, { Fragment, useEffect, useState } from "react";
import { drizzleConnect } from "drizzle-react";

const Dashboard = props => {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState({});
  const [apts, setApts] = useState({});
  const [loading, setLoading] = useState(false);

  // console.log(props)
  useEffect(() => {
    props.drizzle.contracts.DonatETH.methods
      .getUserByAddress(props.accounts[0])
      .call()
      .then(res => {
        console.log(res);
        if (res["0"] === "") return props.history.push("register");
        setUser(res);
      });

    props.drizzle.contracts.DonatETH.methods
      .getUserAppointments(props.accounts[0])
      .call()
      .then(res => {
        const data = {};
        console.log(res);
        for (let i = 0; i < res; i++) {
          props.drizzle.contracts.DonatETH.methods
            .getAppointment(i)
            .call()
            .then(apt => {
              data[i] = apt;
              console.log(apt);
              if (i === res - 1) {
                setApts(data);
              }
            });
        }
      });

    props.drizzle.contracts.DonatETH.methods
      .getUserOrders(props.accounts[0])
      .call()
      .then(total => {
        const data = {};
        console.log(total);
        for (let i = 0; i < total; i++) {
          props.drizzle.contracts.DonatETH.methods
            .getOrder(i)
            .call()
            .then(order => {
              console.log(order);
              data[i] = order;
              if (i === total - 1) {
                setOrders(data);
                console.log(data);
              }
            });
        }
      });

    setLoading(true);
    return () => {
      // cleanup
    };
  }, []);

  return (
    <div>
      <h2>Howdy! {user[2]}</h2>
      <div className="uk-card uk-card-body uk-card-hover uk-width-3-4 uk-align-center">
        <div uk-switcher="animation: uk-animation-fade; toggle: > *">
          <button class="uk-button uk-button-default" type="button">
            Donations
          </button>
          <button class="uk-button uk-button-default" type="button">
            Orders
          </button>
          <button class="uk-button uk-button-default" type="button">
            Profiles
          </button>
        </div>
        <ul class="uk-switcher uk-margin">
          <li>
            <table className="uk-table uk-text-center uk-table-hover uk-table-divider">
              <thead>
                <tr>
                  <th>Appointment Id</th>
                  <th>Status</th>
                  <th>Quantity</th>
                  <th>Worth</th>
                  <th>Physical Address</th>
                  <th>Coordinates</th>
                  <th>Initial Date</th>
                  <th>Complete Date</th>
                  <th>Paid</th>
                </tr>
              </thead>
              <tbody>
                  {Object.keys(apts).map(appInfo => {
                    const { lat, long } = apts[
                      appInfo
                    ].coordinates.split(",");
                    return (
                        <tr>
                            <td>{apts[appInfo].appointmentId}</td>
                            <td>{apts[appInfo].status}</td>
                            <td>{apts[appInfo].quantity}</td>
                            <td>{apts[appInfo].worth}</td>
                            <td>{apts[appInfo].physicalAddress}</td>
                            <td>
                            <a
                                href={`https://www.latlong.net/c/?lat=${lat}&long=${long}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Navigate
                            </a>
                            </td>
                            <td>{apts[appInfo].initialDate}</td>
                            <td>
                            {apts[appInfo].completeDate || "TBD"}
                            </td>
                            <td>{apts[appInfo].paid || "No"}</td>
                        </tr>
                    );
                  })}
              </tbody>
            </table>
          </li>
          <li>
            {Object.keys(orders).map(orderInfo => {
              return <div>{orders[orderInfo]}</div>;
            })}
          </li>
          <li>
            {Object.keys(user).map(userInfo => {
              return <div>{user[userInfo]}</div>;
            })}
          </li>
        </ul>{" "}
      </div>
    </div>
  );
};

export default drizzleConnect(Dashboard, state => {
  return {
    accounts: state.accounts
  };
});
