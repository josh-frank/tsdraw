import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coordinates, CurvePoint, Dimensions } from "../types";
import { RootState } from "./store";

interface PenState {
    points: Array<CurvePoint>;
}

const initialState = {
    points: []
} as PenState;

const penSlice = createSlice( {
    name: "pen",
    initialState,
    reducers: {
        addPoint: ( state, action: PayloadAction<CurvePoint> ) => ( { ...state, points: [ ...state.points, action.payload ] } )
    }
} );

export const {
    addPoint,
} = penSlice.actions;

export const selectPoints = ( state: RootState ) => state.pen.points;

export default penSlice.reducer;
