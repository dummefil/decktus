import { createSlice, configureStore } from '@reduxjs/toolkit'
import {TileData} from "../data/TileData.jsx";

const createOne = () => {
    const tile = TileData(0);
    tile.linkedTo = [8, 9];
    return tile;
}

const t = createOne();

const initialTiles = {
    0: t,
    1: TileData(1),
    6: TileData(6),
    7: TileData(7),
}

const initialState = {
    tiles: Object.values(initialTiles),
    currentTile: null,
    breadcrumbs: [],
    isInFolder: false,
    editMode: false,
    db: {
        ...initialTiles,
        8: TileData(8),
        9: TileData(9),
    },
}

const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        toggleEditMode (state) {
            state.editMode = !state.editMode;
        },
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
                console.log(JSON.stringify(tile));
                state.currentTile = tile;
                state.tiles = tile.linkedTo.map((id) => state.db[id]);
            }
            state.breadcrumbs.pop();
        }

    }
})

export const {
    toggleEditMode,
    stepInFolder,
    stepOutFolder
} = systemSlice.actions

export default systemSlice.reducer;
