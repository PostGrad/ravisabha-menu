import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "../data/AppStore";
import { Button } from "react-daisyui";

function EventList() {
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();
  const getEventListData = useAppStore((state) => state.getEventListData);
  const eventListData = useAppStore((state) => state.eventListData);

  // const calculateEventTotalExpense = useAppStore(
  //   (state) => state.calculateEventTotalExpense
  // );

  // let eventIds = events.map((eve) => eve.id);
  // console.log("eventIds ====>>>>>>> ", eventIds);

  // for (let index = 0; index < eventIds.length; index++) {
  //   events[eventIds[index]] = calculateEventTotalExpense(
  //     events[eventIds[index]].id
  //   );
  // }

  useEffect(() => {
    // let eventIds = eventList.map((eve) => eve.id);
    // console.log("eventIds ====>>>>>>> ", eventIds);

    // for (let index = 0; index < eventIds.length; index++) {
    //   eventList[eventIds[index]] = calculateEventTotalExpense(
    //     eventList[eventIds[index]].id
    //   );
    // }
    const eventList = getEventListData();
    // console.log("eventList ====>>>>>>> ", eventListData);

    setEvents(eventListData);
    // console.log("events ====>>>>>>> ", events);
  }, []);

  const handleEditClick = (eventId) => {
    console.log("edit clicked", eventId);

    navigate("/evententryform", {
      state: { stateProp: events.filter((e) => e.id === eventId)[0] },
    });
  };

  const handleMoreDetailsClick = (eventId) => (e) => {
    e.stopPropagation();
    console.log("more details clicked", eventId);

    navigate("/detailedevent", {
      state: { stateProp: events.filter((e) => e.id === eventId)[0] },
    });
  };

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
            <th>Is Event Open</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {events.map((event) => (
            <tr key={event.id} onClick={() => handleEditClick(event.id)}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="font-bold">{event.eventName}</div>
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
              <td>
                <div className="grid justify-items">
                  <div>
                    <input
                      type="checkbox"
                      className="toggle toggle-accent"
                      checked={event.isOpen}
                      disabled
                    />
                  </div>
                </div>
              </td>
              {/* <th>
                <Button onClick={handleEditClick}>Edit</Button>
              </th> */}
              <th>
                <Button onClick={handleMoreDetailsClick(event.id)}>
                  More Details
                </Button>
              </th>
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
            <th>Is Event Open</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default EventList;
