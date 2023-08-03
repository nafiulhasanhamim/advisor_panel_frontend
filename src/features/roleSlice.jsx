import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialinfo = {
  roleinfo: {
    role: "",
  },
};

export const roleinfoSlice = createSlice({
  name: "roleinfo",
  initialState: initialinfo,
  reducers: {
    getRoleInfo: (state) => {
      const info = JSON.parse(localStorage.getItem("userinfo"));
      if (info?.role) {
        state.roleinfo = {
          ...state.roleinfo,
          role: info.role,
        };
      } else {
        state.roleinfo = { role: "" };
      }
    },
  },
});

export const { getRoleInfo } = roleinfoSlice.actions;
export default roleinfoSlice.reducer;
