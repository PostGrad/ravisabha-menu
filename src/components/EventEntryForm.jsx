import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { enIN } from "date-fns/locale";
import { parseISO } from "date-fns";
import Select from "react-select";
import ConfirmDialog from "./confirmModal/Confirm";
import * as yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import useAppStore from "../data/AppStore";

const EventEntryForm = () => {
  const [NewEventStore, setNewEventStore] = useState({
    eventName: "",
    date: new Date(),
    place: "",
    menuItems: [],
    hostName: "",
    phoneNumber: "",
    bhojanCount: "",
    totalExpense: "",
    receivedAmount: "",
  });
  const { state } = useLocation();
  const addEvent = useAppStore((state) => state.addEvent);
  const updateEvent = useAppStore((state) => state.updateEvent);
  const deleteEvent = useAppStore((state) => state.deleteEvent);
  const [errors, setErrors] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();
  const locale = registerLocale("enIN", enIN);

  const menuItemsOptions = useAppStore((state) => state.MenuItems).map(
    (item) => ({
      value: item,
      label: item,
    })
  );

  const schema = yup.object().shape({
    eventName: yup.string().required("Name is required."),
    date: yup.date().required("Date is required."),
    menuItems: yup.array().min(1, "Menu items are required."),
    bhojanCount: yup.number().positive("Count must be a positive number."),
    receivedAmount: yup
      .number()
      .positive("Received amount must be a positive number."),
  });
  useEffect(() => {
    if (!!state) {
      let tempStore = {
        id: state.id,
        eventName: state.eventName,
        date: parseISO(state.date),
        place: state.place,
        menuItems: state.menuItems.map((item) => ({
          value: item,
          label: item,
        })),
        hostName: state.hostName,
        phoneNumber: state.phoneNumber,
        bhojanCount: state.bhojanCount,
        totalExpense: state.totalExpense,
        receivedAmount: state.receivedAmount,
      };
      setNewEventStore(tempStore);
    } else {
      setNewEventStore({
        eventName: "",
        date: new Date(),
        place: "",
        menuItems: [],
        hostName: "",
        phoneNumber: "",
        bhojanCount: "",
        totalExpense: "",
        receivedAmount: "",
      });
    }
  }, [state]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("inside try");
      await schema.validate(NewEventStore, { abortEarly: false });
      console.log("after validate call");
      setErrors({});
      let newEvent = structuredClone(NewEventStore);
      newEvent.menuItems = newEvent.menuItems.map((item) => item.value);
      newEvent.date = newEvent.date.toISOString();
      newEvent.bhojanCount = parseFloat(newEvent.bhojanCount);
      newEvent.receivedAmount = parseFloat(newEvent.receivedAmount);
      if (!!newEvent.id) {
        console.log("current event ==>> ", newEvent);

        updateEvent(newEvent);
      } else {
        newEvent.id = Math.ceil(Math.random * 1000000);
        console.log("new event ==>> ", newEvent);

        addEvent(newEvent);
      }

      navigate("/");
    } catch (err) {
      const newErrors = err.inner.reduce((acc, err) => {
        console.log(err);
        return { ...acc, [err.path]: err.message };
      }, {});
      setErrors(newErrors);
    }
    console.log(NewEventStore);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    console.log("Delete clicked");
    deleteEvent(NewEventStore.id);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-9 font-mono">
      <h1 className="my-4 text-2xl hover:font-bold">New Event Creation Form</h1>
      <div className="grid grid-cols-10 w-full">
        <div className="" />
        <div className="col-span-8">
          <form>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <div>
                  <label className="label" htmlFor="eventName" />
                  Name:
                </div>
                <div>
                  <input
                    className="input input-bordered w-full max-w-xs"
                    id="eventName"
                    type="text"
                    value={NewEventStore.eventName}
                    onChange={(e) =>
                      setNewEventStore({
                        ...NewEventStore,
                        eventName: e.target.value,
                      })
                    }
                  />
                </div>
                {errors.eventName && (
                  <span className="text-sm text-red-600">
                    {errors.eventName}
                  </span>
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
              <div className="">
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
                <label className="label" htmlFor="hostName" />
                Host:
              </div>
              <div>
                <input
                  className="input input-bordered w-full max-w-xs"
                  id="hostName"
                  type="text"
                  value={NewEventStore.hostName}
                  onChange={(e) =>
                    setNewEventStore({
                      ...NewEventStore,
                      hostName: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <div>
                  <label className="label" htmlFor="phoneNumber" />
                  Phone Number:
                </div>
                <div>
                  <input
                    className="input input-bordered w-full max-w-xs"
                    id="phoneNumber"
                    type="text"
                    value={NewEventStore.phoneNumber}
                    onChange={(e) =>
                      setNewEventStore({
                        ...NewEventStore,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <div>
                  <label className="label" htmlFor="bhojanCount" />
                  Count:
                </div>
                <div>
                  <input
                    className="input input-bordered w-full max-w-xs"
                    id="bhojanCount"
                    type="text"
                    value={NewEventStore.bhojanCount}
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
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Save
                </button>
              </div>
              <div>
                <button
                  className="btn btn-error"
                  onClick={(e) => {
                    e.preventDefault();
                    setConfirmOpen(true);
                  }}
                >
                  Delete
                </button>
                <ConfirmDialog
                  title="Delete Event?"
                  open={confirmOpen}
                  onClose={() => setConfirmOpen(false)}
                  onConfirm={(e) => handleDelete(e)}
                >
                  Are you sure you want to delete this event?
                </ConfirmDialog>
              </div>
            </div>
          </form>
        </div>
      </div>
      <p>{JSON.stringify(NewEventStore)}</p>
    </div>
  );
};

export default EventEntryForm;
