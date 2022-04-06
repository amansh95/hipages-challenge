import React from "react";
import Lead, { endpointPrefix } from "./Lead";
import axios from "axios";
import { uuid } from "uuidv4";

const LeadsList = ({ data, invitedList }) => {
  const handlReset = async () => {
    await axios.delete(`${endpointPrefix}/leads/all`);
    window.location.reload(false);
  };
  if (invitedList)
    return (
      <div className="float-container">
        <h1>Invited Leads</h1>
        <div className="item-container">
          {data.map((lead) => {
            return <Lead key={uuid()} lead={lead} invited={true} />;
          })}
        </div>
        <div className="float-child-2">
          <button className="button-1" onClick={() => handlReset()}>
            Reset all leads to new
          </button>
        </div>
      </div>
    );
  return (
    <div className="float-container">
      <h1>Accepted Leads</h1>
      <div className="item-container">
        {data.map((lead) => {
          return <Lead key={uuid()} lead={lead} invited={false} />;
        })}
      </div>
    </div>
  );
};

export default LeadsList;
