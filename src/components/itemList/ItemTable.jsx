import React, { useState } from "react";

function ItemTable() {
  const [rowsData, setRowsData] = useState([]);

  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleChange = (rowObj) => {
    setRowsData([...rowsData, rowObj]);
  };
  return (
    <>
      {rowsData.length > 0 && (
        <div className="flex justify-center ">
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
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <TableRow
                    rowsData={rowsData}
                    deleteTableRows={deleteTableRows}
                  />
                </tbody>
              </table>
            </div>
            <div className="col-sm-4"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default ItemTable;
