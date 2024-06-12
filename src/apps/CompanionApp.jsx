import {useSelector} from "react-redux";
import {Tile} from "../components/Tile/Tile";
import {FunctionalTile} from "../components/FunctionalTile";
import {Breadcrumbs} from "../components/Breadcrumbs";
import {Grid} from "../components/Grid";
import {FullScreenButton} from "../components/FullScreenButton";

export const CompanionApp = () => {
    const currentTile = useSelector(state => state.system.currentTile);
    const tiles = useSelector(state => state.system.tiles);

    const Tiles = tiles.map((itemSettings) => <Tile key={itemSettings.id} settings={itemSettings}/>)
    if (currentTile) {
        Tiles.unshift(<FunctionalTile key={'back'}/>)
    }

    return (
        <>
            <Breadcrumbs/>
            {currentTile && console.debug(`Folder opened ${currentTile.id}`)}
            <Grid>
                {Tiles}
            </Grid>
            <FullScreenButton/>
        </>
    )
}
