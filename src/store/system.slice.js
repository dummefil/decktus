import { createSlice } from '@reduxjs/toolkit'
import {TileData} from "../data/TileData";

const initialTiles = {}

for (let i = 0; i < 18; i++) {
    const id = (i+1).toString();
    initialTiles[id] = TileData(id);
}

const initialState = {
    tiles: Object.values(initialTiles),
    currentTile: null,
    breadcrumbs: [],
    isInFolder: false,
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
