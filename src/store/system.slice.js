import { createSlice, configureStore } from '@reduxjs/toolkit'
import {TileData} from "../data/TileData.jsx";

const createOne = () => {
    const tile = TileData(1);
    tile.linkedTo = [2,3,4,5,6,7,8,9];
    return tile;
}

const initialState = {
    tiles: [createOne()],
    tile: null,
    currentFolder: null,
    breadcrumbs: [],
    editMode: false,
    db: {
        1: createOne(),
        2: TileData(2),
        3: TileData(3),
        4: TileData(4),
        5: TileData(5),
        6: TileData(6),
        7: TileData(7),
        8: TileData(8),
        9: TileData(9)
    }
}

const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        toggleEditMode (state) {
            state.editMode = !state.editMode;
        },
        setActiveTile(state, {payload}) {
            const tile = payload;
            state.tile = tile;
            if (payload.linkedTo?.length) {
                state.tiles = payload.linkedTo.map((id) => state.db[id]);
            } else {
                state.tiles = [];
            }
            state.breadcrumbs.push(tile.id);
        },
        breadcrumbsStepUp(state) {
            const id = state.breadcrumbs.pop();
            const tile = state.db[id];
            state.tiles = [tile];
        }

    }
})

export const {
    toggleEditMode,
    setActiveTile,
    breadcrumbsStepUp
} = systemSlice.actions

export default systemSlice.reducer;
