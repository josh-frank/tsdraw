import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coordinates, Dimensions } from "../types";
import { RootState } from "./store";

interface ClientState {
    dimensions: Dimensions,
    mouse: Coordinates,
    mouseDown: any,
}

const initialState = {} as ClientState;

const clientSlice = createSlice( {
    name: "client",
    initialState,
    reducers: {
        setDimensions: ( state, action: PayloadAction<Dimensions> ) => ( { ...state, dimensions: action.payload } ),
        setMouse: ( state, action: PayloadAction<Coordinates> ) => ( { ...state, mouse: action.payload } ),
        setMouseDown: ( state, action: PayloadAction<Coordinates> ) => ( { ...state, mouseDown: action.payload } ),
        setMouseUp: ( state ) => ( { ...state, mouseDown: null } )
    }
} );

export const {
    setDimensions,
    setMouse,
    setMouseDown,
    setMouseUp
} = clientSlice.actions;

export const selectDimensions = ( state: RootState ) => state.client.dimensions;
export const selectMouse = ( state: RootState ) => state.client.mouse;
export const selectMouseDown = ( state: RootState ) => state.client.mouseDown;

export default clientSlice.reducer;
