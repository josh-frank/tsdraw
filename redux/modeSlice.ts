import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const modeSlice = createSlice( {
    name: "mode",
    initialState: "pen",
    reducers: {
        setAppMode: ( state, action: PayloadAction<string> ) => action.payload,
    }
} );

export const {
    setAppMode,
} = modeSlice.actions;

export const selectAppMode = ( state: RootState ) => state.mode;

export default modeSlice.reducer;
