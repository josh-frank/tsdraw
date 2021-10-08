import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

import { Coordinates } from "../types";
import { reflect } from "../utilities";

interface PenState {
    points: Coordinates[];
    shapes: Coordinates[][];
}

const initialState = {
    points: [],
    shapes: []
} as PenState;

const penSlice = createSlice( {
    name: "pen",
    initialState,
    reducers: {
        addPoint: ( state, action: PayloadAction<Coordinates> ) => ( { ...state, points: [ ...state.points, action.payload ] } ),
        closePath: state => {
            if ( state.points.length < 5 ) return state;
            return {
                ...state,
                shapes: [ ...state.shapes, [
                    ...state.points,
                    { x: reflect( state.points[ 1 ].x, state.points[ 0 ].x ), y: reflect( state.points[ 1 ].y, state.points[ 0 ].y ) },
                    { x: state.points[ 0 ].x, y: state.points[ 0 ].y },
                    { x: state.points[ 0 ].x, y: state.points[ 0 ].y }
                ] ],
                points: [] 
            };
        },
        clearPoints: ( state ) => ( { ...state, points: [] } )
    }
} );

export const {
    addPoint,
    closePath,
    clearPoints,
} = penSlice.actions;

export const selectPoints = ( state: RootState ) => state.pen.points;
export const selectShapes = ( state: RootState ) => state.pen.shapes;

export default penSlice.reducer;