import React, { useState } from "react";
import Select from "react-select";
import * as yup from "yup";

import { Units } from "../../data/Units";
import useAppStore from "../../data/AppStore";

function ItemRow({ optionsArray, placeholder, eventId }) {
  const LoggedInUser = useAppStore((state) => state.LoggedInUser);

  const [store, setStore] = useState({
    itemName: "",
    quantity: "",
    unit: { label: "kg", value: "kg" },
    price: "",
    userId: { label: LoggedInUser.userName, value: LoggedInUser.userName },
  });

  const addRecord = useAppStore((state) => state.updateEventDetails);

  const [errors, setErrors] = useState({});

  const schema = yup.object().shape({
    itemName: yup.mixed().test("is-filled", "Required.", (value) => !!value),
    quantity: yup.string().required("Required."),
    unit: yup.mixed().test("is-filled", "Required.", (value) => !!value),
    price: yup.string().required("Required."),
    userId: yup.mixed().test("is-filled", "Required.", (value) => !!value),
  });
  const options = optionsArray.map((item) => ({
    value: item,
    label: item,
  }));
  const unitOptions = Units.map((item) => ({
    value: item,
    label: item,
  }));

  const Users = useAppStore((state) => state.Users);
  const usersOptions = Users.map((user) => ({
    value: user.userName,
    label: user.userName,
  }));

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      console.log("inside try");
      await schema.validate(store, { abortEarly: false });
      setErrors({});
      console.log("after validate call");
      //handleChange(store);
      let currentEventDetailRecord = {};
      currentEventDetailRecord.eventId = eventId;
      currentEventDetailRecord.placeholder = placeholder;
      currentEventDetailRecord.expenseObj = structuredClone(store);
      console.log("store  ", store);

      currentEventDetailRecord.expenseObj.itemName =
        currentEventDetailRecord.expenseObj.itemName.value;
      currentEventDetailRecord.expenseObj.unit =
        currentEventDetailRecord.expenseObj.unit.value;
      currentEventDetailRecord.expenseObj.userId =
        currentEventDetailRecord.expenseObj.userId.value;

      console.log("currentEventDetailRecord ==>> ", currentEventDetailRecord);
      addRecord(currentEventDetailRecord);

      setStore({
        itemName: "",
        quantity: "",
        unit: { label: "kg", value: "kg" },
        price: "",
        userId: { label: LoggedInUser.userName, value: LoggedInUser.userName },
      });
    } catch (err) {
      console.log("err ==>> ", err);

      const newErrors = err.inner.reduce((acc, err) => {
        console.log(err);
        return { ...acc, [err.path]: err.message };
      }, {});
      setErrors(newErrors);
    }
  };
  return (
    <>
      <div className="flex flex-row gap-4 items-center flex-wrap md:flex-nowrap">
        <div className="basis-1/6">
          <Select
            menuPosition="fixed"
            id="itemName"
            options={options}
            placeholder={placeholder}
            value={store.itemName}
            onChange={(value) => setStore({ ...store, itemName: value })}
            required={true}
          />
          {errors.itemName && (
            <span className="text-sm text-red-600">{errors.itemName}</span>
          )}
        </div>
        <div className="basis-1/6">
          <input
            className="input input-bordered w-full max-w-xs"
            id="quantity"
            type="text"
            placeholder="Quantity"
            value={store.quantity}
            onChange={(e) =>
              setStore({
                ...store,
                quantity: e.target.value,
              })
            }
          />{" "}
          {errors.quantity && (
            <span className="text-sm text-red-600">{errors.quantity}</span>
          )}
        </div>

        <div className="basis-1/6">
          <Select
            menuPosition="fixed"
            id="unit"
            options={unitOptions}
            placeholder="Unit"
            value={store.unit}
            onChange={(value) => setStore({ ...store, unit: value })}
            required={true}
          />
          {errors.unit && (
            <span className="text-sm text-red-600">{errors.unit}</span>
          )}
        </div>
        <div className="basis-1/6">
          <input
            className="input input-bordered w-full max-w-xs"
            id="price"
            type="text"
            placeholder="Price"
            value={store.price}
            onChange={(e) =>
              setStore({
                ...store,
                price: e.target.value,
              })
            }
          />
          {errors.price && (
            <span className="text-sm text-red-600">{errors.price}</span>
          )}
        </div>
        <div className="basis-1/6">
          <Select
            menuPosition="fixed"
            id="userId"
            options={usersOptions}
            placeholder="User"
            value={store.userId}
            onChange={(value) => setStore({ ...store, userId: value })}
            required={true}
          />
          {errors.userId && (
            <span className="text-sm text-red-600">{errors.userId}</span>
          )}
        </div>
        <div className="basis-1/6">
          <button className="btn btn-accent" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </>
  );
}

export default ItemRow;
