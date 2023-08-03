import { createSlice } from "@reduxjs/toolkit";

const initialinfo = {
  userinfo: {
    token: "",
    role: "",
  },
};

export const userinfoSlice = createSlice({
  name: "userinfo",
  initialState: initialinfo,
  reducers: {
    getInfo: (state) => {
      const info = JSON.parse(localStorage.getItem("userinfo"));
      if (info?.token) {
        state.userinfo = {
          ...state.userinfo,
          token: info.token,
          role: info.access,
        };
      } else {
        state.userinfo = { token: "", role: "" };
      }
    },
  },
});

export const { getInfo } = userinfoSlice.actions;
export default userinfoSlice.reducer;
