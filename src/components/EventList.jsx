import React from "react";
import { eventListData } from "../data/eventlistData";

function EventList() {
  const events = eventListData;
  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Event Name</th>
            <th>Date</th>
            <th>Place</th>
            <th>Menu Items</th>
            <th>Host</th>
            <th>Phone Number</th>
            <th>Count</th>
            <th>Total Expense</th>
            <th>Received Amount</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {events.map((event) => (
            <tr key={event.id} onClick={() => console.log(event.id)}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="font-bold">{event.eventName}</div>
                    {/* <div className="text-sm opacity-50">United States</div> */}
                  </div>
                </div>
              </td>
              <td>
                {event.date}
                {/* <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span> */}
              </td>
              <td>{event.place}</td>
              <td>
                {event.menuItems.map((item, index) => (
                  <span key={index} className="badge badge-ghost badge-md">
                    {item}
                  </span>
                ))}
              </td>
              <td>{event.hostName}</td>
              <td>{event.phoneNumber}</td>
              <td>{event.bhojanCount}</td>
              <td>{event.totalExpense}</td>
              <td>{event.receivedAmount}</td>

              {/* <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th> */}
            </tr>
          ))}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th>Event Name</th>
            <th>Date</th>
            <th>Place</th>
            <th>Menu Items</th>
            <th>Host</th>
            <th>Phone Number</th>
            <th>Count</th>
            <th>Total Expense</th>
            <th>Received Amount</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default EventList;
