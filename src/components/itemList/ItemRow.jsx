import React, { useState } from "react";
import Select from "react-select";
import * as yup from "yup";

import { Units } from "../../data/Units";

function ItemRow({ optionsArray }) {
  const [store, setStore] = useState({
    name: "",
    quantity: "",
    unit: [],
    price: "",
  });
  const [errors, setErrors] = useState({});
  const schema = yup.object().shape({
    name: yup.string().required("Menu items are required."),
  });
  const options = optionsArray.map((item) => ({
    value: item,
    label: item,
  }));
  const unitOptions = Units.map((item) => ({
    value: item,
    label: item,
  }));

  return (
    <>
      <div className="flex flex-row gap-4 items-center flex-wrap md:flex-nowrap">
        <div className="basis-1/2">
          <Select
            menuPosition="fixed"
            id="name"
            options={options}
            placeholder="Vegetables"
            value={store.name}
            onChange={(value) => setStore({ ...store, name: value })}
            required={true}
          />
          {errors.menuItems && (
            <span className="text-sm text-red-600">{errors.menuItems}</span>
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
          />
        </div>

        <div className="basis-1/10">
          <Select
            menuPosition="fixed"
            id="vegetable"
            options={unitOptions}
            placeholder="Unit"
            value={store.unit}
            onChange={(value) => setStore({ ...store, unit: value })}
            required={true}
          />
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
        </div>
        <div className="basis-1/10">
          <button className="btn btn-outline-success">Add</button>
        </div>
      </div>
    </>
  );
}

export default ItemRow;
