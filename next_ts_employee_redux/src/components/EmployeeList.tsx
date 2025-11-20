import React, {useContext} from 'react';
import InfoTable from "@/components/InfoTable";
import {buttonBarStyle} from "./Main";
import {useDispatch, useSelector} from "react-redux";
import {handleSelectedId} from "@/redux/employeeSlice";
import {Rootstate, RootDispatch} from "@/redux/store";


const EmployeeList = () => {
  const {infos} = useSelector((state: Rootstate) => state.emp);
  const dispatch = useDispatch<RootDispatch>();
  return (
    <>
      <div style={buttonBarStyle}>
        {infos?.map(info => (
            <button key={info.id}
                    onClick={() => dispatch(handleSelectedId(info.id))}
            >{info.name}
            </button>
          )
        )}
      </div>
      <InfoTable />

    </>

  );
};

export default EmployeeList;