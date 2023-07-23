import React from "react";

function TableRow({ rowsData, deleteTableRows, placeholder }) {
  return rowsData.map((data, index) => {
    const { itemId, itemName, quantity, unit, price } = data;
    return (
      <tr key={index}>
        <td>
          <label>{index + 1}</label>
        </td>
        <td>
          <label>{itemName}</label>
        </td>
        <td>
          <label>{quantity}</label>
        </td>
        <td>
          <label>{unit}</label>
        </td>
        <td>
          <label>{price}</label>
        </td>
        <td>
          <button
            className="btn btn-error"
            onClick={(e) => {
              e.preventDefault();
              console.log("itemId, placeholder   =>>> ", itemId, placeholder);

              deleteTableRows({ itemId, placeholder });
            }}
          >
            x
          </button>
        </td>
      </tr>
    );
  });
}

export default TableRow;
