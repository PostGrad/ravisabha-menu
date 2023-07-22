import React, { useState } from "react";
import Select from "react-select";
import * as yup from "yup";

import { Units } from "../../data/Units";
import useAppStore from "../../data/AppStore";

function ItemRow({ optionsArray, handleChange, placeholder, eventId }) {
  const [store, setStore] = useState({
    name: "",
    quantity: "",
    unit: { label: "kg", value: "kg" },
    price: "",
  });

  const addRecord = useAppStore((state) => state.updateEventDetails);

  const [errors, setErrors] = useState({});

  const schema = yup.object().shape({
    name: yup.mixed().test("is-filled", "Required.", (value) => !!value),
    quantity: yup.string().required("Required."),
    unit: yup.mixed().test("is-filled", "Required.", (value) => !!value),
    price: yup.string().required("Required."),
  });
  const options = optionsArray.map((item) => ({
    value: item,
    label: item,
  }));
  const unitOptions = Units.map((item) => ({
    value: item,
    label: item,
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
      addRecord(currentEventDetailRecord);

      setStore({
        name: "",
        quantity: "",
        unit: { label: "kg", value: "kg" },
        price: "",
      });
    } catch (err) {
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
        <div className="basis-1/3">
          <Select
            menuPosition="fixed"
            id="name"
            options={options}
            placeholder={placeholder}
            value={store.name}
            onChange={(value) => setStore({ ...store, name: value })}
            required={true}
          />
          {errors.name && (
            <span className="text-sm text-red-600">{errors.name}</span>
          )}
        </div>
        <div className="basis-1/10">
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

        <div className="basis-1/10">
          <Select
            menuPosition="fixed"
            id="Options"
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
        <div className="basis-1/5">
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
        <div className="basis-1/9">
          <button className="btn btn-accent" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </>
  );
}

export default ItemRow;
