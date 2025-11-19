//json 서버
import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {EmployeeInfo} from "@/redux/slice/employeeSlice";

const API_URL = "http://localhost:3001";

//GET 전체 infos
//db에서 가져오기 때문에 fetch 사용
export const fetchGetEmployeeInfos = createAsyncThunk<EmployeeInfo[], void, { rejectValue: string }>(
  "employeeApi/fetchGetEmployeeInfos",
  async (_, thunkAPI) => {
    //react는 object 로 던지기 때문에 () 안의 파라미터를 하나만 받아도 됨
    try {
      const response = await axios.get(`${API_URL}/app/emp`);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("데이터 로드 실패")
    }
  }
);

export const fetchPostEmployeeInfo = createAsyncThunk<
  EmployeeInfo, EmployeeInfo, {rejectValue: string}>
(
  "employeeApi/fetchPostEmployeeInfo",
  async (obj, thunkAPI) => {
    try {
      const response = await axios.post<EmployeeInfo>(`${API_URL}/app/emp`, obj);
      return response.data; //던진 자기 자신을 반환. action.payload
    } catch {
      return thunkAPI.rejectWithValue("데이터 전송 실패")
    }
  }
)

//delete selectedId기반
export const fetchDeleteEmployeeInfoById = createAsyncThunk<
  number, number, {rejectValue: string}
>(
  "employeeApi/fetchDeleteEmployeeInfoById",
  async (id, thunkAPI) => {
    try{
      await axios.delete(`${API_URL}/${id}`);
      return id;
    }catch{
      return thunkAPI.rejectWithValue("데이터 삭제 실패")
    }
  }
)

export const fetchPutEmployeeInfoById = createAsyncThunk<
  EmployeeInfo, EmployeeInfo, {rejectValue: string}
>(
  "employeeApi/fetchPutEmployeeInfoById",
  async (emp, thunkAPI) => {
    try {
      const response = await axios.put<EmployeeInfo>(`${API_URL}/${emp.id}`, emp);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("데이터 수정 실패")
    }
  }
)
