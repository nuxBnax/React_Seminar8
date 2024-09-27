import { configureStore } from "@reduxjs/toolkit";
import jokeReducer from './jokeSlice';
import convertationReducer from './convertationSlice';


export const store = configureStore( {
    reducer: {
        joke: jokeReducer,
        convertation: convertationReducer,
    }
})