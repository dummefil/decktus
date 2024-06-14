import {useSelector} from "react-redux";
import {Tile} from "../components/Tile/Tile";
import {FunctionalTile} from "../components/Tile/FunctionalTile.jsx";
import {Breadcrumbs} from "../components/Breadcrumbs";
import {Grid} from "../components/Grid";
import {FullScreenButton} from "../components/FullScreenButton";
import {Panel} from "../components/Panel.jsx";
import {useRef,} from "react";
import {useTileSize} from "../hooks/useTileSize.jsx";

export const CompanionApp = () => {
    const currentTile = useSelector(state => state.system.currentTile);
    const isInFolder = useSelector(state => state.system.isInFolder);
    const tiles = useSelector(state => state.system.tiles);
    const ref = useRef(null);

    const size = useTileSize(ref);

    const Tiles = tiles.map((itemSettings) => {
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

    return (
        <Panel ref={ref} $column>
            <Breadcrumbs/>
            {currentTile && console.debug(`Folder opened ${currentTile.id}`)}
            <Grid>
                {Tiles}
            </Grid>
            <FullScreenButton/>
        </Panel>
    )
}
