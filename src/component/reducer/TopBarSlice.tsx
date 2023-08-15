import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../reducer/Store";




export interface TopBarState {
  title: string;
  role: string;
  userName : string
 
}

const initialState: TopBarState = {
  title: localStorage.getItem("Title") ?? "Dashboard",
  userName: localStorage.getItem("user") ?? "",
  role: localStorage.getItem("role") ?? "",
 
};

export const topBarSlice = createSlice({
  name: "topbar",
  initialState,

  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
      localStorage.setItem("Title", action.payload);
    },
    set_Role: (state, action) => {
      state.role = action.payload;
      localStorage.setItem("role", action.payload);
    },

    set_userName: (state, action) => {
      state.userName = action.payload;
      localStorage.setItem("user", action.payload);
    },

    
  },
});

export const { setTitle, set_Role, set_userName } =
  topBarSlice.actions;
export const title = (state: RootState) => state.topbar.title;

export default topBarSlice.reducer;
