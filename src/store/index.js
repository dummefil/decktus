import {configureStore} from "@reduxjs/toolkit";
import systemSlice from "./system.slice.js";
import settingsSlice from "./settings.slice.js";

const store = configureStore({
    reducer: {
        system: systemSlice,
        settings: settingsSlice
    }
})

export default store;
