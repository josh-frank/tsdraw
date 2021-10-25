import { configureStore  } from "@reduxjs/toolkit";
import clientReducer from "./clientSlice"
import modeReducer from "./modeSlice"
import artboardReducer from "./artboardSlice"

export const store = configureStore( {
    reducer: {
        client: clientReducer,
        mode: modeReducer,
        artboard: artboardReducer,
    }
} );

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
