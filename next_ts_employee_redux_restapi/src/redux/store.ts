import {configureStore} from "@reduxjs/toolkit";
import emp from "@/redux/slice/employeeSlice";
//import 변수 from "해당 컴포넌트 경로";

export const store = configureStore({
  reducer: {
    //import + 선언해준 변수명만 쓰면 된다
    emp,
  }
});

export type Rootstate = ReturnType<typeof store.getState>;  //state
export type RootDispatch = typeof store.dispatch; //action을 잡는것

//최초에 한 번만 세팅하고, reducer 안에 변수 추가만 하면 된다