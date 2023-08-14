import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { enIN } from "date-fns/locale";
import { parseISO } from "date-fns";
import Select from "react-select";
import * as yup from "yup";
import {
  Vegetables,
  Grocery,
  DairyItems,
  Beverages,
} from "../data/ingrediantsData";
import "react-datepicker/dist/react-datepicker.css";
import TableRow from "./itemList/TableRow";
import ItemRow from "./itemList/ItemRow";
import useAppStore from "../data/AppStore";

const DetailedEvent = () => {
  const [NewEventStore, setNewEventStore] = useState({
    name: "",
    date: new Date(),
    place: "",
    menuItems: [],
    host: "",
    phone: "",
    count: "",
    totalExpense: "",
    receivedAmount: "",
  });
  const [vegRowsData, setVegRowsData] = useState([]);

  const {
    state: { stateProp },
  } = useLocation();

  const [errors, setErrors] = useState({});
  const locale = registerLocale("enIN", enIN);

  const menuItemsOptions = useAppStore((state) => state.MenuItems).map(
    (item) => ({
      value: item,
      label: item,
    })
  );

  const currentEventDetails = useAppStore((state) =>
    state.eventDetailsData.find((eve) => eve.eventId === stateProp.id)
  );

  const deleteDetailsRow = useAppStore(
    (state) => state.deleteEventDetailRecord
  );

  const calculateTotalVegPrice = () => {
    return vegRowsData.reduce(
      (total, item) => total + parseFloat(item.price),
      0
    );
  };

  //console.log("currentEventDetails => ", currentEventDetails);

  const schema = yup.object().shape({
    name: yup.string().required("Name is required."),
    date: yup.date().required("Date is required."),
    menuItems: yup.array().min(1, "Menu items are required."),
    count: yup.number().positive("Count must be a positive number."),
    receivedAmount: yup
      .number()
      .positive("Received amount must be a positive number."),
  });

  useEffect(() => {
    if (!!stateProp) {
      let tempStore = {
        id: stateProp.id,
        name: stateProp.eventName,
        date: parseISO(stateProp.date),
        place: stateProp.place,
        menuItems: stateProp.menuItems.map((item) => ({
          value: item,
          label: item,
        })),
        host: stateProp.hostName,
        phone: stateProp.phoneNumber,
        count: stateProp.bhojanCount,
        totalExpense: stateProp.totalExpense,
        receivedAmount: stateProp.receivedAmount,
      };
      setNewEventStore(tempStore);
      console.log("render count => ", currentEventDetails);
      if (currentEventDetails?.vegetableExpenses) {
        let tempVegRowsData = currentEventDetails.vegetableExpenses.map(
          (record) => ({
            itemId: record.itemId,
            itemName: record.itemName,
            quantity: record.quantity,
            unit: record.unit,
            price: record.price,
            userId: record.userId,
          })
        );
        //console.log("tempVegRowsData ==>> ", tempVegRowsData);

        setVegRowsData([...tempVegRowsData]);
      }
    } else {
      setNewEventStore({
        name: "",
        date: new Date(),
        place: "",
        menuItems: [],
        host: "",
        phone: "",
        count: "",
        totalExpense: "",
        receivedAmount: "",
      });
    }
  }, [stateProp, currentEventDetails]);

  const deleteTableRows = ({ itemId, placeholder }) => {
    console.log("Event deleteTableRows ==>> ");

    deleteDetailsRow({
      eventId: currentEventDetails.eventId,
      itemId,
      placeholder,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-9 font-mono">
      <h1 className="my-4 text-2xl hover:font-bold">Event Details Page</h1>
      <div className="grid grid-cols-10 w-full">
        <div className="" />
        <div className="col-span-8">
          <div className="collapse bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Main Details
            </div>
            <div className="collapse-content">
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <div>
                    <label className="label" htmlFor="name" />
                    Event Name:
                  </div>
                  <div>
                    <input
                      className="input input-bordered w-full max-w-xs"
                      id="name"
                      type="text"
                      value={NewEventStore.name}
                      onChange={(e) =>
                        setNewEventStore({
                          ...NewEventStore,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  {errors.name && (
                    <span className="text-sm text-red-600">{errors.name}</span>
                  )}
                </div>
                <div>
                  <div>
                    <label className="label" htmlFor="date" />
                    Date:
                  </div>
                  <div>
                    <DatePicker
                      className="input input-bordered w-full max-w-xs"
                      locale={locale}
                      dateFormat="dd-MM-yyyy"
                      placeholderText="Select Date 🗓️"
                      selected={NewEventStore.date}
                      onChange={(value) =>
                        setNewEventStore({ ...NewEventStore, date: value })
                      }
                    />

                    {errors.date && (
                      <span className="text-sm text-red-600">
                        {errors.date ? "Date is required." : ""}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <div>
                  <label className="label" htmlFor="place" />
                  Place:
                </div>
                <div>
                  <input
                    className="input input-bordered w-full max-w-xs"
                    id="place"
                    type="text"
                    value={NewEventStore.place}
                    onChange={(e) =>
                      setNewEventStore({
                        ...NewEventStore,
                        place: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="mb-6">
                <div>
                  <label htmlFor="MenuItems" />
                  Menu Items:
                </div>
                <div>
                  <Select
                    id="MenuItems"
                    options={menuItemsOptions}
                    placeholder="Add menu items..."
                    isMulti
                    value={NewEventStore.menuItems}
                    onChange={(value) =>
                      setNewEventStore({ ...NewEventStore, menuItems: value })
                    }
                    required={true}
                  />
                  {errors.menuItems && (
                    <span className="text-sm text-red-600">
                      {errors.menuItems}
                    </span>
                  )}
                </div>
              </div>
              <div className="mb-6">
                <div>
                  <label className="label" htmlFor="host" />
                  Host:
                </div>
                <div>
                  <input
                    className="input input-bordered w-full max-w-xs"
                    id="host"
                    type="text"
                    value={NewEventStore.host}
                    onChange={(e) =>
                      setNewEventStore({
                        ...NewEventStore,
                        host: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <div>
                    <label className="label" htmlFor="phone" />
                    Phone Number:
                  </div>
                  <div>
                    <input
                      className="input input-bordered w-full max-w-xs"
                      id="phone"
                      type="text"
                      value={NewEventStore.phone}
                      onChange={(e) =>
                        setNewEventStore({
                          ...NewEventStore,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label className="label" htmlFor="count" />
                    Count:
                  </div>
                  <div>
                    <input
                      className="input input-bordered w-full max-w-xs"
                      id="count"
                      type="text"
                      value={NewEventStore.count}
                      onChange={(e) =>
                        setNewEventStore({
                          ...NewEventStore,
                          count: e.target.value,
                        })
                      }
                    />
                  </div>
                  {errors.count && (
                    <span className="text-sm text-red-600">{errors.count}</span>
                  )}
                </div>
                <div>
                  <div>
                    <label className="label" htmlFor="totalExpense" />
                    Total Expense:
                  </div>
                  <div>
                    <input
                      disabled
                      className="input input-bordered w-full max-w-xs"
                      id="totalExpense"
                      type="text"
                      value={NewEventStore.totalExpense}
                      // onChange={(e) =>
                      //   setNewEventStore({
                      //     ...NewEventStore,
                      //     totalExpense: e.target.value,
                      //   })
                      // }
                    />
                  </div>
                  {/* {errors.totalExpense && (
                  <span className="text-sm text-red-600">
                    {errors.totalExpense}
                  </span>
                )} */}
                </div>
                <div>
                  <div>
                    <label className="label" htmlFor="receivedAmount" />
                    Received Amount:
                  </div>
                  <div>
                    <input
                      className="input input-bordered w-full max-w-xs"
                      id="receivedAmount"
                      type="text"
                      value={NewEventStore.receivedAmount}
                      onChange={(e) =>
                        setNewEventStore({
                          ...NewEventStore,
                          receivedAmount: e.target.value,
                        })
                      }
                    />
                  </div>
                  {errors.receivedAmount && (
                    <span className="text-sm text-red-600">
                      {errors.receivedAmount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <form>
            <div className="collapse bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium flex justify-between">
                <div>Add Vegetable Expenses</div>
                <div className="badge badge-lg badge-primary">
                  {calculateTotalVegPrice()}
                </div>
              </div>
              <div className="collapse-content">
                <div className="z-100">
                  <ItemRow
                    optionsArray={Vegetables}
                    placeholder="Vegetables"
                    eventId={NewEventStore.id}
                  />
                </div>
                {vegRowsData.length > 0 && (
                  <div className="flex justify-center z-0">
                    <div className="row">
                      <div className="col-sm-8 ">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Vegetable</th>
                              <th>Quantity</th>
                              <th>Unit</th>
                              <th>Price</th>
                              <th>Bought By</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <TableRow
                              rowsData={vegRowsData}
                              deleteTableRows={deleteTableRows}
                              placeholder="Vegetables"
                            />
                          </tbody>
                        </table>
                      </div>
                      <div className="col-sm-4"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <p>{JSON.stringify(NewEventStore)}</p> */}
    </div>
  );
};

export default DetailedEvent;
