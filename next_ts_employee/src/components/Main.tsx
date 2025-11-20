'use client'
import React, {useMemo} from 'react';
import {useState} from "react";
import EmployeeList from "@/components/EmployeeList";
import Register from "@/components/Register";
import Upgrade from "@/components/Upgrade";

export const buttonBarStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  padding: "20px",
}

//api 받기 위한 구조
export type EmployeeInfo = {
  id: number | string | null;
  name: string;
  age: number | string;
  job: string;
  language: string;
  pay: number | string;
}

//object의 배열 형태
//Fact table
const initialTotal: EmployeeInfo[] = [
  {id: 1, name: 'John', age: 35, job: "frontend", language: "react", pay: 4},
  {id: 2, name: 'Peter', age: 20, job: "frontend", language: "react", pay: 3},
  {id: 3, name: 'Sue', age: 40, job: "frontend", language: "react", pay: 2},
  {id: 4, name: 'Susan', age: 17, job: "frontend", language: "react", pay: 1},
]

type Mode = "" | "register" | "upgrade" | "delete" | "reset"


const initialEmpInfo: EmployeeInfo = {id: 1, name: 'John', age: 35, job: "frontend", language: "react", pay: 1}


// const test = ["John2", "Peter2", "John3"]

const Main = () => {
  const [infos, setInfos] = useState<EmployeeInfo[]>(initialTotal);
  const [upInfo, setUpInfo] = useState<EmployeeInfo>(initialEmpInfo);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [mode, setMode] = useState<Mode>('');
  const modes = useMemo(() => [
    {id: "register" as const, label: "register"},
    {id: "upgrade" as const, label: "upgrade"},
    {id: "delete" as const, label: "delete"},
    {id: "reset" as const, label: "reset"}], [])

  const handleMode = (mod: Mode) => {
    if(mod === "delete") {
      if (!selectedId) {
        alert("직원을 선택해주세요")
        return;
      }
      const targetObj = infos.find(x => x.id === selectedId)
      if (!targetObj) {
        alert("해당 직원이 없습니다")
        return;
      }
      if (confirm(`${targetObj.name} 직원을 삭제하겠습니까?`)) {
        setInfos(prev => prev.filter(item => item.id !== selectedId))
        setMode("");
        setUpInfo('');
        setSelectedId('');
      }
      return ;
    }
    if(mod === 'reset') {
      if(confirm("목록을 초기 데이터로 되돌릴까요?")){
        setInfos(initialTotal)
        setMode("");
        setUpInfo('');
        setSelectedId('');
      }
      return;
    }
    if(mod === "upgrade"){
      alert("수정할 직원을 먼저 선택하세요")
      return;
    }
    setMode(mod)
  }

  const handleSelectedId = (id: number) => {
    setSelectedId(id)
    const found: EmployeeInfo | null =
      infos.filter(info => info.id === id)[0] ?? null;
    setUpInfo(found);
  }

  const handleRegister = (obj: EmployeeInfo) => {
    const nextId = infos.length ? Math.max(...infos.map(i => i.id)) + 1 : 1;

    if(!obj.name) {
      alert("이름은 필수입니다.")
      return;
    }
    if(!obj.age || Number(obj.age) < 0) {
      alert("나이는 필수입니다.")
      return;
    }
    if(!obj.pay || Number(obj.pay) < 0) {
      alert("급여는 필수입니다.")
      return;
    }
    // if(!obj.language) {
    //   alert("언어는 필수입니다.")
    //   return;
    // }
    // if(!obj.job) {
    //   alert("직업은 필수입니다.")
    //   return;
    // }
    if(infos.some(item => item.name === obj.name)) {
      alert("이미 존재하는 이름입니다.")
      return;
    }
    setInfos(prev => ([...prev,{...obj, id:nextId}]))
  }

  const handleUpgrade = (obj: EmployeeInfo) => {
    if(Number(obj.age) < 0) {
      alert("나이는 0 이상입니다.")
      return;
    }
    if(Number(obj.pay) < 0) {
      alert("급여는 0 이상입니다.")
      return;
    }
    console.log(obj)
    setInfos(prev => prev.map(item =>
      item.id  === obj.id ? {...item,
        job: obj.job,
        language: obj.language,
        pay: obj.pay,
      } : item
    ));
    setMode('')
  }

  return (
    <>
      <div>
        <EmployeeList
          infos={infos}
          selectedId={selectedId}
          handleSelectedId={handleSelectedId}
        /> {/*자식: InfoTable*/}
      </div>
      <div>{selectedId}</div>
      <div style={buttonBarStyle}>
        {modes.map(mode => (
          <button key={mode.id} onClick={() => handleMode(mode.id)}>{mode.label}</button>
        ))}
      </div>
      <div>{mode === "register" && (<Register handleRegister = {handleRegister}/>)}
        {mode === "upgrade" && <Upgrade
          selectedId={selectedId}
          upInfo = {upInfo}
          handleUpgrade={handleUpgrade}
        />}
      </div>
    </>

  );
};


export default Main;

