import * as TILE_DATA_TYPES from "./TileTypes";

export const randomId = () => Math.random().toString().slice(2, 10)

export function TileData({ name, action, type, icon }) {
    if (!TILE_DATA_TYPES[type.toUpperCase()]) {
        throw new Error(`TileData type "${type}" is not supported`);
    }

    let _id = randomId();
    let _type = type;
    let _name = name || _id;
    let _icon;
    let _action;

    if (icon) {
        _icon = icon;
    }

    if (action) {
        _action = action
    }

    return  {
        id: _id,
        type: _type,
        name: _name,
        action: _action,
        icon: _icon,
        linkedTo: [],
    };
}
