import {Tile} from "../components/Tile/Tile";
import {FunctionalTile} from "../components/Tile/FunctionalTile";
import {useSelector} from "react-redux";
import {useTileSize} from "./useTileSize";
import {useRef} from "react";

export const useTiles = () => {
    const currentTile = useSelector(state => state.system.currentTile);
    const isInFolder = useSelector(state => state.system.isInFolder);
    const tiles = useSelector(state => state.system.tiles);
    const db = useSelector(state => state.system.db);

    const tilesCount = useSelector(state => state.settings.tilesCount);

    const ref = useRef(null);
    const size = useTileSize(ref);

    const Tiles = (tiles.length ? tiles : db.slice(0, tilesCount)).map((itemSettings) => {
            return <Tile
                key={itemSettings.id}
                settings={itemSettings}
                size={size}
            />
        }
    )
    if (currentTile && isInFolder) {
        Tiles.unshift(<FunctionalTile size={size} key={'back'}/>)
    }

    return [ref, Tiles];
}
