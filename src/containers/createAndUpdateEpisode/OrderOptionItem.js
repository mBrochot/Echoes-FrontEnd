import React, { useState } from "react";

const OrderOptionItem = ({ elem, index, options, setOptions }) => {
  const [elementStatus, setElementStatus] = useState(elem.status);

  // const addOptionOrdered = (item) => {
  //   if (item.status === true) {
  //     if (optionsOrdered.indexOf(item._id) > -1) {
  //       const newOptions = [...optionsOrdered];
  //       newOptions.push(item);
  //       setOptionsOrdered(newOptions);
  //     }
  //   } else {
  //     const newOptions = [...optionsOrdered];
  //     newOptions.splice(newOptions.indexOf(elem._id), 1);
  //     setOptionsOrdered(newOptions);
  //   }
  //   return optionsOrdered;
  // };

  return (
    <label>
      <div className="orderOptionItem">
        <p>
          <input
            type="checkbox"
            name="options"
            checked={elem.status}
            onChange={(event) => {
              setElementStatus(!elementStatus);
              const newOptions = [...options];
              newOptions[index].status = !newOptions[index].status;
              setOptions(newOptions);
            }}
          ></input>
          {elem.title}
          <span className="sublineInfo"> ({elem.optionsType})</span>
        </p>
        <p>+{elem.amount} € </p>
      </div>
    </label>
  );
};

export default OrderOptionItem;
