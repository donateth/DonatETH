import React, { Fragment } from "react";

export default appointmentInfo => (
  <table className="uk-table uk-text-center uk-table-hover uk-table-divider">
    <thead>
      <tr>
        <th>Appointment Id</th>
        <th>Status</th>
        <th>Donator</th>
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
      <tr>
        {Object.keys(appointmentInfo).map(appInfo => {
          const { lat, long } = appointmentInfo[appInfo].coordinates.split(",");
          return (
            <Fragment>
              <td>{appointmentInfo[appInfo].appointmentId}</td>
              <td>{appointmentInfo[appInfo].status}</td>
              <td>{appointmentInfo[appInfo].donator}</td>
              <td>{appointmentInfo[appInfo].quantity}</td>
              <td>{appointmentInfo[appInfo].worth}</td>
              <td>{appointmentInfo[appInfo].physicalAddress}</td>
              <td>
                <a
                  href={`https://www.latlong.net/c/?lat=${lat}&long=${long}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Navigate
                </a>
              </td>
              <td>{appointmentInfo[appInfo].initialDate}</td>
              <td>{appointmentInfo[appInfo].completeDate || "TBD"}</td>
              <td>{appointmentInfo[appInfo].paid || "No"}</td>
            </Fragment>
          );
        })}
      </tr>
    </tbody>
  </table>
);
