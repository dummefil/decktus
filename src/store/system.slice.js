import { createSlice } from '@reduxjs/toolkit'
import {randomId, TileData} from "../data/TileData";
import * as TILE_DATA_TYPES from "../data/TileTypes.js";

const initialTiles = {}

class Localizator {
    constructor() {
        this.lang = 'ru'
        this.dict = {
            'presetGroup': 'Группа'
        }
    }
    localize(id) {
        return this.dict[id] || id;
    }
}

const localizator = new Localizator()

function PresetGroup(children) {
    return {
        type: 'preset-group',
        name: localizator.localize('presetGroup'),
        id: randomId(),
        children
    }
}

const presets = [
    new PresetGroup([
        new TileData({
            name: 'Folder',
            action: 'folder_open',
            icon: 'folder',
            type: TILE_DATA_TYPES.FUNCTIONAL
        }),
        new TileData({
            name: 'Action',
            action: 'action_${id}',
            icon: 'middle-finger',
            type: TILE_DATA_TYPES.FOLDER
        }),
    ])
]

const initialGrid = (rowSize, columnSize) => {
    const obj = {

    }
    for (let i = 0; i < rowSize * columnSize; i++) {
        const tileData = new TileData({ type: TILE_DATA_TYPES.BLANK })
        obj[tileData.id] = tileData;
    }
    return obj;
}

const root = initialGrid(3, 5);

const initialState = {
    tiles: Object.values(root),
    currentTile: null,
    breadcrumbs: [],
    isInFolder: false,
    presets,
    db: root,
}

const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        setTile(state, {payload}) {
            const id = payload.id;
            const updatedTile = {
                ...state.db[id],
                ...payload
            }
            state.db[id] = updatedTile
            state.tiles = state.tiles.map((tile) => {
                console.log(tile.id, id);
                if (tile.id === id) {
                    return updatedTile
                } else {
                    return tile;
                }
            })
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
                state.currentTile = tile;
                state.tiles = tile.linkedTo.map((id) => state.db[id]);
            }
            state.breadcrumbs.pop();
        }

    }
})

export const {
    setTile,
    stepInFolder,
    stepOutFolder
} = systemSlice.actions

export default systemSlice.reducer;
