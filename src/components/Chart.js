import React from "react";
import { useEffect, useState } from "react";
import chartData from "../helpers/chartFetchHelper";

function Chart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    chartData().then((response) => {
      setData(response);
    });
  }, []);

  return (
    <div className={"outer"}>
      {data.map((item, index) => {
        return (
          <div className={"inner"} key={index}>
            <p>{item.name}</p>
            <div
              style={{
                width: "80px",
                height: item.population / 10000000,
                backgroundColor: "gray",
              }}
            ></div>
            <p>{item.population}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Chart;
