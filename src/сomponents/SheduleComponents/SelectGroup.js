import React from "react";
import { useEffect } from "react";
import Select from "react-select";

import { getGroups } from "../api/getDates";

export const SheduleBlock = (selectedGroup, setSelectedGroup) => {
  

  return (
    <>
      <label
        className="shedule-block__select-group--lable"
        htmlFor={"group"}
      >
        Оберіть вашу групу:
        </label>
      <Select
        value={selectedGroup}
        onChange={setSelectedGroup}
        id={"group"}
        className="shedule-block__select-group"
      />
    </>
  );
};