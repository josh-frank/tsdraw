import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coordinates, Dimensions } from "../types";
import { RootState } from "./store";

interface ArtboardState {
    dimensions: Dimensions,
    zoom: number,
    offset: Coordinates,
    displayGrid: boolean,
    gridInterval: number,
    darkMode: boolean
}

const initialState = {
        dimensions: { width: 1000, height: 800 },
        zoom: 100,
        offset: { x: 0, y: 0 },
        displayGrid: true,
        gridInterval: 10,
        darkMode: false
    } as ArtboardState;

const artboardSlice = createSlice( {
    name: "artboard",
    initialState,
    reducers: {
        setArtboardDimensions: ( state, action: PayloadAction<Dimensions> ) => ( { ...state, dimensions: action.payload } ),
        setZoom: ( state, action: PayloadAction<number> ) => ( { ...state, zoom: action.payload } ),
        setOffset: ( state, action: PayloadAction<Coordinates> ) => ( { ...state, offset: action.payload } ),
        toggleGridDisplay: ( state ) => ( { ...state, displayGrid: !state.displayGrid } ),
        setGridInterval: ( state, action: PayloadAction<number> ) => ( { ...state, gridInterval: action.payload } ),
        toggleDarkMode: ( state ) => ( { ...state, darkMode: !state.darkMode } ),
    }
} );

export const {
    setArtboardDimensions,
    setZoom,
    setOffset,
    toggleGridDisplay,
    setGridInterval,
    toggleDarkMode,
} = artboardSlice.actions;

export const selectArtboardDimensions = ( state: RootState ) => state.artboard.dimensions;
export const selectZoom = ( state: RootState ) => state.artboard.zoom;
export const selectOffset = ( state: RootState ) => state.artboard.offset;
export const selectDisplayGrid = ( state: RootState ) => state.artboard.displayGrid;
export const selectDarkMode = ( state: RootState ) => state.artboard.darkMode;

export default artboardSlice.reducer;
