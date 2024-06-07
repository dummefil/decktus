import { createSlice } from '@reduxjs/toolkit'
import {TileData} from "../data/TileData.jsx";

const initialTiles = {
    // 0: t,
    1: TileData(1),
    2: TileData(1),
    3: TileData(1),
    4: TileData(1),
    5: TileData(1),
    6: TileData(6),
    7: TileData(7),
    8: TileData(7),
    9: TileData(7),
    10: TileData(7),
    11: TileData(7),
    12: TileData(7),
    13: TileData(7),
    14: TileData(7),
    15: TileData(7),
    16: TileData(7),
    17: TileData(7),
    18: TileData(7),
}

const initialState = {
    tiles: Object.values(initialTiles),
    currentTile: null,
    breadcrumbs: [],
    isInFolder: false,
    editMode: window.location.pathname.indexOf('edit') > -1,
    db: {
        ...initialTiles,
    },
}

const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        stepInFolder(state, {payload}) {
            const tile = payload;
            state.currentTile = tile;
            if (payload.linkedTo?.length) {
                state.tiles = payload.linkedTo.map((id) => state.db[id]);
            } else {
                state.tiles = [];
            }
            state.breadcrumbs.push(tile.id);
        },
        stepOutFolder(state) {
            const id = state.breadcrumbs[state.breadcrumbs.length - 2];
            if (id === undefined) {
                state.currentTile = null;
                state.tiles = Object.values(initialTiles);
            } else {
                const tile = state.db[id];
                state.currentTile = tile;
                state.tiles = tile.linkedTo.map((id) => state.db[id]);
            }
            state.breadcrumbs.pop();
        }

    }
})

export const {
    stepInFolder,
    stepOutFolder
} = systemSlice.actions

export default systemSlice.reducer;
