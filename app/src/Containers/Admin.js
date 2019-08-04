import React, { useEffect, useState } from "react";
import Appointment from "../Appointments";

import '../App.css'

export default function Admin(props) {
  const [apts, setApts] = useState({});
  useEffect(() => {
    const total = props.drizzle.contracts.DonatETH.methods
      .getAllAppointment()
      .call()
      .then(total => {
        const data = {};
        console.log({ total });
        for (let i = 1; i < total; i++) {
          console.log(i);
          props.drizzle.contracts.DonatETH.methods
            .getAppointment(i)
            .call()
            .then(apt => {
              data[i] = apt;
              //   console.log(apt);
              if (i === total - 1) {
                setApts(data);
                console.log(data);
              }
            });
        }
      });

    // total.then(res => console.log({ res }));
    // return () => {
    //     cleanup
    // };
  }, []);
  return (
    <div>
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
          {Object.keys(apts).map(apt => {
            const data = apts[apt];
            return <Appointment key={data.appointmentId} appointmentInfo={data} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
