import React from "react";

const Filter = ({ handleFilter }) => {
  return (
    <div>
      filter names <input onChange={handleFilter}></input>
    </div>
  );
};

export default Filter;
