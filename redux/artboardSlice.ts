import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { createSelector } from 'reselect'

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
        dimensions: { width: 0, height: 0 },
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
        moveOffset: ( state, action: PayloadAction<Coordinates> ) => ( { ...state, offset: { x: state.offset.x - action.payload.x, y: state.offset.y - action.payload.y } } ),
        toggleGridDisplay: ( state ) => ( { ...state, displayGrid: !state.displayGrid } ),
        setGridInterval: ( state, action: PayloadAction<number> ) => ( { ...state, gridInterval: action.payload } ),
        toggleDarkMode: ( state ) => ( { ...state, darkMode: !state.darkMode } ),
    }
} );

export const {
    setArtboardDimensions,
    setZoom,
    setOffset,
    moveOffset,
    toggleGridDisplay,
    setGridInterval,
    toggleDarkMode,
} = artboardSlice.actions;

export const selectArtboardDimensions = ( state: RootState ) => state.artboard.dimensions;
export const selectZoom = ( state: RootState ) => state.artboard.zoom;
export const selectOffset = ( state: RootState ) => state.artboard.offset;
export const selectDisplayGrid = ( state: RootState ) => state.artboard.displayGrid;
export const selectGridInterval = ( state: RootState ) => state.artboard.gridInterval;
export const selectDarkMode = ( state: RootState ) => state.artboard.darkMode;

export const applyScaleAndOffset = createSelector( selectZoom, selectOffset, ( zoom, offset ) => ( coordinates: Coordinates ): Coordinates => ( { x: ( coordinates.x - offset.x ) / zoom * 100, y: ( coordinates.y - offset.y ) / zoom * 100 } ) );
export const unapplyScaleAndOffset = createSelector( selectZoom, selectOffset, ( zoom, offset ) => ( coordinates: Coordinates ): Coordinates => ( { x: offset.x + coordinates.x * zoom / 100, y: offset.y + coordinates.y * zoom / 100 } ) );

export default artboardSlice.reducer;
