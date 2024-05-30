const randomId = () => Math.random().toString().slice(2, 10)

export function TileData(id, type = 'folder',) {
    let _id = id;
    const obj = {
        id: _id,
        type,
        name: 'Tile name',
        linkedTo: [],
    };

    let icon;
    let action;
    let tiles;
    if (obj.type === 'folder') {
        icon = 'folder';
        action = 'folder_open';
    } else {
        icon = 'faGrinBeam';
        action = `action_${_id}`;
    }

    if (tiles) {
        obj.tiles = tiles;
    }

    obj.icon = icon;
    obj.action = action;

    return obj;
}