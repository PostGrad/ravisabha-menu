import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { enIN } from "date-fns/locale";
import { parseISO } from "date-fns";
import Select from "react-select";
import * as yup from "yup";
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
    bhojanCount: "",
    totalExpense: "",
    receivedAmount: "",
  });
  const [vegRowsData, setVegRowsData] = useState([]);
  const [groceryRowsData, setGroceryRowsData] = useState([]);
  const [beveragesRowsData, setBeveragesRowsData] = useState([]);
  const [dairyItemsRowsData, setDairyItemsRowsData] = useState([]);
  const [disposableItemsRowsData, setDisposableItemsRowsData] = useState([]);
  const [otherExpensesRowsData, setOtherExpensesRowsData] = useState([]);

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

  const eventListData = useAppStore((state) => state.eventListData);

  const Vegetables = useAppStore((state) => state.Vegetables);

  const Grocery = useAppStore((state) => state.Grocery);

  const Beverages = useAppStore((state) => state.Beverages);

  const DairyItems = useAppStore((state) => state.DairyItems);

  const DisposableItems = useAppStore((state) => state.DisposableItems);

  const OtherExpenses = useAppStore((state) => state.OtherExpenses);

  const currentEventDetails = useAppStore((state) =>
    state.eventDetailsData.find((eve) => eve.eventId === stateProp.id)
  );
  const updateEvent = useAppStore((state) => state.updateEvent);
  const getEventListData = useAppStore((state) => state.getEventListData);
  const deleteDetailsRow = useAppStore(
    (state) => state.deleteEventDetailRecord
  );

  const calculateTotalVegPrice = () => {
    return vegRowsData.reduce(
      (total, item) => total + parseFloat(item.price),
      0
    );
  };

  const calculateTotalGroceryPrice = () => {
    return groceryRowsData.reduce(
      (total, item) => total + parseFloat(item.price),
      0
    );
  };

  const calculateTotalBeveragesPrice = () => {
    return beveragesRowsData.reduce(
      (total, item) => total + parseFloat(item.price),
      0
    );
  };

  const calculateTotalDairyItemsPrice = () => {
    return dairyItemsRowsData.reduce(
      (total, item) => total + parseFloat(item.price),
      0
    );
  };

  const calculateTotalDisposableItemsPrice = () => {
    return disposableItemsRowsData.reduce(
      (total, item) => total + parseFloat(item.price),
      0
    );
  };

  const calculateOtherExpensesPrice = () => {
    return otherExpensesRowsData.reduce(
      (total, item) => total + parseFloat(item.price),
      0
    );
  };

  const calculateAllExpenses = () => {
    const totalExpense =
      calculateTotalVegPrice() +
      calculateTotalGroceryPrice() +
      calculateTotalBeveragesPrice() +
      calculateTotalDairyItemsPrice() +
      calculateTotalDisposableItemsPrice() +
      calculateOtherExpensesPrice();
    // let newEvent = structuredClone(NewEventStore);
    // newEvent.menuItems = newEvent.menuItems.map((item) => item.value);
    // newEvent.date = newEvent.date.toISOString();
    // newEvent.bhojanCount = newEvent.bhojanCount;
    // newEvent.receivedAmount = newEvent.receivedAmount;
    // newEvent.totalExpense = totalExpense;
    // console.log("updating current event ==>> ", newEvent);
    // updateEvent(newEvent);
    return totalExpense;
  };

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
    const eventList = getEventListData();

    if (!!stateProp) {
      // console.log("currentEventDetails => ", currentEventDetails);
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
      if (currentEventDetails?.groceryExpenses) {
        let tempGroceryRowsData = currentEventDetails.groceryExpenses.map(
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
        setGroceryRowsData([...tempGroceryRowsData]);
      }
      if (currentEventDetails?.beveragesExpenses) {
        let tempBeveragesRowsData = currentEventDetails.beveragesExpenses.map(
          (record) => ({
            itemId: record.itemId,
            itemName: record.itemName,
            quantity: record.quantity,
            unit: record.unit,
            price: record.price,
            userId: record.userId,
          })
        );

        setBeveragesRowsData([...tempBeveragesRowsData]);
      }
      if (currentEventDetails?.dairyItemsExpenses) {
        let tempDairyItemsRowsData = currentEventDetails.dairyItemsExpenses.map(
          (record) => ({
            itemId: record.itemId,
            itemName: record.itemName,
            quantity: record.quantity,
            unit: record.unit,
            price: record.price,
            userId: record.userId,
          })
        );

        setDairyItemsRowsData([...tempDairyItemsRowsData]);
      }
      if (currentEventDetails?.disposableItemsExpenses) {
        let tempDisposableItemsRowsData =
          currentEventDetails.disposableItemsExpenses.map((record) => ({
            itemId: record.itemId,
            itemName: record.itemName,
            quantity: record.quantity,
            unit: record.unit,
            price: record.price,
            userId: record.userId,
          }));

        setDisposableItemsRowsData([...tempDisposableItemsRowsData]);
      }
      if (currentEventDetails?.otherExpenses) {
        let tempOtherExpensesRowsData = currentEventDetails.otherExpenses.map(
          (record) => ({
            itemId: record.itemId,
            itemName: record.itemName,
            quantity: record.quantity,
            unit: record.unit,
            price: record.price,
            userId: record.userId,
          })
        );

        setOtherExpensesRowsData([...tempOtherExpensesRowsData]);
      }

      let tempEventData = eventListData.find((eve) => eve.id === stateProp.id);

      // console.log("tempEventData ====>>>>>>> ", tempEventData);

      let tempStore = {
        id: tempEventData.id,
        name: tempEventData.eventName,
        date: parseISO(tempEventData.date),
        place: tempEventData.place,
        menuItems: tempEventData.menuItems.map((item) => ({
          value: item,
          label: item,
        })),
        host: tempEventData.hostName,
        phone: tempEventData.phoneNumber,
        bhojanCount: tempEventData.bhojanCount,
        totalExpense: tempEventData.totalExpense,
        receivedAmount: tempEventData.receivedAmount,
      };
      setNewEventStore(tempStore);
      // console.log("event stateProp => ", stateProp);

      // console.log("event main data => ", tempStore);
    } else {
      setNewEventStore({
        name: "",
        date: new Date(),
        place: "",
        menuItems: [],
        host: "",
        phone: "",
        bhojanCount: "",
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
    getEventListData();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-9 font-mono">
      <h1 className="my-4 text-2xl hover:font-bold">Event Details Page</h1>
      <div className="grid grid-cols-10 w-full">
        <div className="" />
        <div className="col-span-8">
          <div className="collapse collapse-arrow bg-base-200">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-medium flex justify-between  peer-checked:bg-red-50">
              Main Details
              <div className="badge badge-lg badge-secondary">
                {calculateAllExpenses()}
              </div>
            </div>
            <div className="collapse-content peer-checked:bg-red-50">
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
                      disabled
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
                      disabled
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
                    disabled
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
                    isDisabled
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
                    disabled
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
                      disabled
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
                      value={NewEventStore.bhojanCount}
                      disabled
                      onChange={(e) =>
                        setNewEventStore({
                          ...NewEventStore,
                          bhojanCount: e.target.value,
                        })
                      }
                    />
                  </div>
                  {errors.bhojanCount && (
                    <span className="text-sm text-red-600">
                      {errors.bhojanCount}
                    </span>
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
                      disabled
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
            <div className="collapse collapse-arrow bg-base-200">
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
                              <th>Paid By</th>
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
          <form>
            <div className="collapse collapse-arrow bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium flex justify-between">
                <div>Add Grocery Expenses</div>
                <div className="badge badge-lg badge-primary">
                  {calculateTotalGroceryPrice()}
                </div>
              </div>
              <div className="collapse-content">
                <div className="z-100">
                  <ItemRow
                    optionsArray={Grocery}
                    placeholder="Grocery"
                    eventId={NewEventStore.id}
                  />
                </div>
                {groceryRowsData.length > 0 && (
                  <div className="flex justify-center z-0">
                    <div className="row">
                      <div className="col-sm-8 ">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Grocery</th>
                              <th>Quantity</th>
                              <th>Unit</th>
                              <th>Price</th>
                              <th>Paid By</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <TableRow
                              rowsData={groceryRowsData}
                              deleteTableRows={deleteTableRows}
                              placeholder="Grocery"
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
          <form>
            <div className="collapse collapse-arrow bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium flex justify-between">
                <div>Add Beverages Expenses</div>
                <div className="badge badge-lg badge-primary">
                  {calculateTotalBeveragesPrice()}
                </div>
              </div>
              <div className="collapse-content">
                <div className="z-100">
                  <ItemRow
                    optionsArray={Beverages}
                    placeholder="Beverages"
                    eventId={NewEventStore.id}
                  />
                </div>
                {beveragesRowsData.length > 0 && (
                  <div className="flex justify-center z-0">
                    <div className="row">
                      <div className="col-sm-8 ">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Beverages</th>
                              <th>Quantity</th>
                              <th>Unit</th>
                              <th>Price</th>
                              <th>Paid By</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <TableRow
                              rowsData={beveragesRowsData}
                              deleteTableRows={deleteTableRows}
                              placeholder="Beverages"
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
          <form>
            <div className="collapse collapse-arrow bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium flex justify-between">
                <div>Add Dairy Items Expenses</div>
                <div className="badge badge-lg badge-primary">
                  {calculateTotalDairyItemsPrice()}
                </div>
              </div>
              <div className="collapse-content">
                <div className="z-100">
                  <ItemRow
                    optionsArray={DairyItems}
                    placeholder="Dairy Items"
                    eventId={NewEventStore.id}
                  />
                </div>
                {dairyItemsRowsData.length > 0 && (
                  <div className="flex justify-center z-0">
                    <div className="row">
                      <div className="col-sm-8 ">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Dairy Item</th>
                              <th>Quantity</th>
                              <th>Unit</th>
                              <th>Price</th>
                              <th>Paid By</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <TableRow
                              rowsData={dairyItemsRowsData}
                              deleteTableRows={deleteTableRows}
                              placeholder="Dairy Items"
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
          <form>
            <div className="collapse collapse-arrow bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium flex justify-between">
                <div>Add Disposable Items Expenses</div>
                <div className="badge badge-lg badge-primary">
                  {calculateTotalDisposableItemsPrice()}
                </div>
              </div>
              <div className="collapse-content">
                <div className="z-100">
                  <ItemRow
                    optionsArray={DisposableItems}
                    placeholder="Disposable Items"
                    eventId={NewEventStore.id}
                  />
                </div>
                {disposableItemsRowsData.length > 0 && (
                  <div className="flex justify-center z-0">
                    <div className="row">
                      <div className="col-sm-8 ">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Disposable Item</th>
                              <th>Quantity</th>
                              <th>Unit</th>
                              <th>Price</th>
                              <th>Paid By</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <TableRow
                              rowsData={disposableItemsRowsData}
                              deleteTableRows={deleteTableRows}
                              placeholder="Disposable Items"
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
          <form>
            <div className="collapse collapse-arrow bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium flex justify-between">
                <div>Add Other Expenses</div>
                <div className="badge badge-lg badge-primary">
                  {calculateOtherExpensesPrice()}
                </div>
              </div>
              <div className="collapse-content">
                <div className="z-100">
                  <ItemRow
                    optionsArray={OtherExpenses}
                    placeholder="Other Expenses"
                    eventId={NewEventStore.id}
                    specialFields={{
                      quantityDisabled: false,
                      unit: "NA",
                      quantity: "1",
                    }}
                  />
                </div>
                {otherExpensesRowsData.length > 0 && (
                  <div className="flex justify-center z-0">
                    <div className="row">
                      <div className="col-sm-8 ">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Other Expenses</th>
                              <th>Quantity</th>
                              <th>Unit</th>
                              <th>Price</th>
                              <th>Paid By</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <TableRow
                              rowsData={otherExpensesRowsData}
                              deleteTableRows={deleteTableRows}
                              placeholder="Other Expenses"
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
