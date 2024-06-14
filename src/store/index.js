import {configureStore} from "@reduxjs/toolkit";
import systemSlice from "./system.slice";
import settingsSlice from "./settings.slice";

const store = configureStore({
    reducer: {
        system: systemSlice,
        settings: settingsSlice
    }
})

export default store;
