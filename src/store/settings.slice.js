import { createSlice } from '@reduxjs/toolkit'
import {SettingsData} from "../data/SettingsData";

const initialState = new SettingsData();

const systemSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        saveSettings: (state, action) => {
            state = {
                ...action.payload,
            }
        }
    }
})

export const {
    saveSettings
} = systemSlice.actions

export default systemSlice.reducer;
