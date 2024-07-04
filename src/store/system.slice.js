import { createSlice } from '@reduxjs/toolkit'
import {randomId, TileData} from "../data/TileData";
import * as TILE_DATA_TYPES from "../data/TileTypes";
import {localizator} from "../i18n.js";

function PresetGroup(children) {
    return {
        icon: 'list',
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
            type: TILE_DATA_TYPES.FOLDER
        }),
        new TileData({
            name: 'Action',
            action: 'action_${id}',
            icon: 'middle-finger',
            type: TILE_DATA_TYPES.FUNCTIONAL
        }),
    ])
]

const BlankTileData = (data) => {
    return new TileData({ type: TILE_DATA_TYPES.BLANK, ...data })
}

const initialGrid = (tilesCount) => {
    const arr = []
    for (let i = 0; i < tilesCount; i++) {
        const tileData = BlankTileData()
        arr.push(tileData)
    }
    return arr;
}

const stringToBoolean = (str) => {
    return str === 'true';
}

const tilesCount = 3 * 6;

const key = 'decktus_DB';
const savedDB = localStorage.getItem(key);
let json;
if (savedDB) {
    json = JSON.parse(savedDB);
    console.log('trying to load saved db', json);
}


const initialState = {
    isEditMode: stringToBoolean((new URLSearchParams(location.search).get('edit'))),
    tiles: [],
    currentTile: null,
    breadcrumbs: [],
    isInFolder: false,
    presets,
    db: json || initialGrid(tilesCount),
}

const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        setTile(state, {payload}) {
            const id = payload.id;
            const index = state.db.findIndex((_tile) => _tile.id === id)

            const updatedTile = {
                ...state.db[index],
                ...payload
            }

            state.db[index] = updatedTile;
            state.tiles = state.tiles.map((tile) => {
                if (tile.id === id) {
                    return updatedTile;
                } else {
                    return tile;
                }
            })
            state.currentTile = state.db[index];
        },
        stepInFolder(state, {payload}) {
            const tile = {
                ...payload,
            };
            state.isInFolder = true;
            if (payload.linkedTo?.length) {
                state.tiles = payload.linkedTo.map((id) => {
                    const index = state.db.findIndex((_tile) => _tile.id === id);
                    return state.db[index];
                });
            } else {
                state.tiles = [];
            }

            if (state.tiles.length < tilesCount) {
                const difference = tilesCount - state.tiles.length - 1;
                for (let i = 0; i < difference; i++) {
                    const blankTile = BlankTileData();
                    const tileIndex = state.db.findIndex((_tile) => _tile.id === tile.id);
                    state.db[tileIndex].linkedTo.push(blankTile.id);

                    state.tiles.push(blankTile);
                    state.db.push(blankTile);

                    tile.linkedTo = [
                        ...tile.linkedTo,
                        blankTile.id
                    ]
                }
            }

            state.currentTile = tile;
            state.breadcrumbs.push(tile.id);
        },
        stepOutFolder(state) {
            const id = state.breadcrumbs[state.breadcrumbs.length - 2];
            if (id === undefined) {
                state.currentTile = null;
                state.isInFolder = false;
                state.tiles = state.db.slice(0, tilesCount);
            } else {
                const tileIndex = state.db.findIndex((_tile) => _tile.id === id);
                const tile = state.db[tileIndex];

                state.currentTile = tile;
                state.tiles = tile.linkedTo.map((id) => {
                    const index = state.db.findIndex((_tile) => _tile.id === id);
                    return state.db[index];
                });
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
