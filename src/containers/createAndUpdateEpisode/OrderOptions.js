import React from "react";
import OrderOptionItem from "./OrderOptionItem";

const OrderOptions = ({ options, setOptions }) => {
  return (
    <div className="orderOptions">
      <p>Options</p>
      {options.map((elem, index) => {
        // setElementStatus(elem.status);
        return (
          <OrderOptionItem
            elem={elem}
            options={options}
            setOptions={setOptions}
            key={index}
            index={index}
          ></OrderOptionItem>
        );
      })}
    </div>
  );
};

export default OrderOptions;
