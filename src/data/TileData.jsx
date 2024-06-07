import {TILE_DATA_TYPES} from "./TileTypes.js";

const randomId = () => Math.random().toString().slice(2, 10)

export function TileData() {
    let _id = randomId();
    const obj = {
        id: _id,
        type: (Math.random() > 0.5 ? TILE_DATA_TYPES.FOLDER : TILE_DATA_TYPES.FUNCTIONAL),
        name: _id,
        linkedTo: [],
    };

    let icon;
    let action;
    let tiles;
    if (obj.type === TILE_DATA_TYPES.FOLDER) {
        icon = 'folder';
        action = 'folder_open';
    } else if (obj.type === TILE_DATA_TYPES.FUNCTIONAL) {
        icon = 'middle-finger';
        action = `action_${_id}`;
    }

    if (tiles) {
        obj.tiles = tiles;
    }

    obj.icon = icon;
    obj.action = action;

    return obj;
}
