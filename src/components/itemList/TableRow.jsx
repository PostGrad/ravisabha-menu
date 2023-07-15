import React from "react";

function TableRow({ rowsData, deleteTableRows }) {
  return rowsData.map((data, index) => {
    const { name, quantity, unit, price } = data;
    return (
      <tr key={index}>
        <td>
          <label>{index + 1}</label>
        </td>
        <td>
          <label>{name.value}</label>
        </td>
        <td>
          <label>{quantity}</label>
        </td>
        <td>
          <label>{unit.value}</label>
        </td>
        <td>
          <label>{price}</label>
        </td>
        <td>
          <button
            className="btn btn-error"
            onClick={() => deleteTableRows(index)}
          >
            x
          </button>
        </td>
      </tr>
    );
  });
}

export default TableRow;
