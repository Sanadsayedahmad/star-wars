import React from "react";
import { useEffect, useState } from "react";
import getData from "../helpers/fetchHelper";

function Table({ data }) {
  const [tableData, setTableData] = useState({
    vehicleName: "",
    relatedHomePlanets: [],
    relatedPilotNames: [],
    populationSum: 0,
  });

  useEffect(() => {
    getData().then((response) => {
      setTableData(response);
    });
  }, []);

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>vehicle name with the largest sum</td>
            <td>
              <h5>{tableData.vehicleName}</h5>
            </td>
          </tr>
          <tr>
            <td>Related home planets and their respective population</td>
            <td>
              {tableData.relatedHomePlanets.map((homeLand, index) => {
                return (
                  <>
                    <li key={index}>
                      {homeLand.name} : {homeLand.population}
                    </li>
                  </>
                );
              })}
            </td>
          </tr>
          <tr>
            <td>Related pilot names</td>
            <td>
              {tableData.relatedPilotNames.map((pilot, index) => {
                return (
                  <>
                    <li key={index}>{pilot}</li>
                  </>
                );
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
