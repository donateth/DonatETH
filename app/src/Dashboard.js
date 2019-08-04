import React, { useEffect, useState } from "react";
import { drizzleConnect } from "drizzle-react";
import { UserType } from './Constants';

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
                  <th>Donation Id</th>
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
          <table className="uk-table uk-text-center uk-table-hover uk-table-divider">
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Status</th>
                  <th>Quantity</th>
                  <th>Worth</th>
                  <th>Physical Address</th>
                  <th>Coordinates</th>
                  <th>Initial Date</th>
                  <th>Complete Date</th>
                </tr>
              </thead>
              <tbody>
                  {Object.keys(orders).map(order => {
                    const { lat, long } = apts[
                      order
                    ].coordinates.split(",");
                    return (
                        <tr>
                            <td>{orders[order].orderId}</td>
                            <td>{orders[order].status}</td>
                            <td>{orders[order].quantity}</td>
                            <td>{orders[order].worth}</td>
                            <td>{orders[order].physicalAddress}</td>
                            <td>
                            <a
                                href={`https://www.latlong.net/c/?lat=${lat}&long=${long}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Navigate
                            </a>
                            </td>
                            <td>{orders[order].initialDate}</td>
                            <td>
                            {orders[order].completeDate || "TBD"}
                            </td>
                            <td>{orders[order].paid || "No"}</td>
                        </tr>
                    );
                  })}
              </tbody>
            </table>
          </li>
          <li>
            <br/>
            <img src={user.media} width='225' alt={user.name} className='uk-border-circle'/>
            <p class='uk-card-title'>{user.name}</p>
            <p>Email: {user.email}</p>
            <p>User Type: {UserType[user.uType]}</p>
            <p>{user.aptCount} Donations made</p>
            <p>{user.orderCount} Karma redeemed in form of item.</p>
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
