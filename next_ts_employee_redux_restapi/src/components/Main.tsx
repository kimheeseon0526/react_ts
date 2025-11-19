'use client'
import React, {useMemo, useState} from 'react';
import EmployeeList from "@/components/EmployeeList";
import Register from "@/components/Register";
import Upgrade from "@/components/Upgrade";
import {useDispatch, useSelector} from "react-redux";
import {handleMode} from "@/redux/slice/employeeSlice";
import {RootDispatch, Rootstate} from "@/redux/store";

export const buttonBarStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  padding: "20px",
}

const Main = () => {
  const {mode, modes} = useSelector((state: Rootstate) => state.emp);
  const dispatch = useDispatch<RootDispatch>();


  return (
    <>
      <div>
        <EmployeeList /> {/*자식: InfoTable*/}
      </div>
      <div style={buttonBarStyle}>
        {modes.map(item => (
          <button key={item.id} onClick={() => dispatch(handleMode(item.id))}>{item.label}</button>
        ))}
      </div>
      <div> {mode === "register" && (<Register />)}
            {mode === "upgrade" && <Upgrade />}
      </div>
    </>

  );
};




export default Main;

