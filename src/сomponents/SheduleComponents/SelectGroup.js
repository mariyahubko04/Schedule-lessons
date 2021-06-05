import React from "react";
import Select from "react-select";

export const SelectGroup = ({ isEdit, groups, selectedGroup, setSelectedGroup }) => {
  return (
    <>
      <label
        className="shedule-block__select-group--lable"
        htmlFor={"group"}
      >
        Оберіть групу:
      </label>
      <Select
        value={selectedGroup}
        onChange={setSelectedGroup}
        options={groups}
        id={"group"}
        isDisabled={isEdit}
        className="shedule-block__select-group"
      />
    </>
  );
};