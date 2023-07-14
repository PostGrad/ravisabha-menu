import React, { useState } from "react";
import Select from "react-select";
import * as yup from "yup";

import {
  Vegetables,
  Grocery,
  DairyItems,
  Beverages,
} from "../data/ingrediantsData";
import { Units } from "../data/Units";

function ItemRow() {
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
  const [errors, setErrors] = useState({});
  const schema = yup.object().shape({
    menuItems: yup.array().min(1, "Menu items are required."),
  });
  const vegetablesOptions = Vegetables.map((item) => ({
    value: item,
    label: item,
  }));
  const unitOptions = Units.map((item) => ({
    value: item,
    label: item,
  }));

  return (
    <>
      <div>Grocery Items</div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label htmlFor="vegetable" />
          Vegetable:
        </div>
        <div>
          <label htmlFor="quantity" />
          Quantity:
        </div>
        <div>
          <label htmlFor="vegetable" />
          Unit:
        </div>
        <div>
          <label htmlFor="vegetable" />
          Price:
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <Select
            id="vegetable"
            options={vegetablesOptions}
            placeholder="Add vegetables..."
            value={NewEventStore.menuItems}
            onChange={(value) =>
              setNewEventStore({ ...NewEventStore, menuItems: value })
            }
            required={true}
          />
          {errors.menuItems && (
            <span className="text-sm text-red-600">{errors.menuItems}</span>
          )}
        </div>
        <div>
          <input
            className="input input-bordered w-full max-w-xs"
            id="quantity"
            type="text"
            value={NewEventStore.quantity}
            onChange={(e) =>
              setNewEventStore({
                ...NewEventStore,
                quantity: e.target.value,
              })
            }
          />
        </div>

        <div>
          <Select
            id="vegetable"
            options={unitOptions}
            placeholder="Unit"
            value={NewEventStore.unit}
            onChange={(value) =>
              setNewEventStore({ ...NewEventStore, unit: value })
            }
            required={true}
          />
        </div>
        <div>
          <input
            className="input input-bordered w-full max-w-xs"
            id="price"
            type="text"
            value={NewEventStore.price}
            onChange={(e) =>
              setNewEventStore({
                ...NewEventStore,
                price: e.target.value,
              })
            }
          />
        </div>
      </div>
    </>
  );
}

export default ItemRow;
