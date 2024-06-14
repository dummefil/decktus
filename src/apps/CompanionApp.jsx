import {useSelector} from "react-redux";
import {Breadcrumbs} from "../components/Breadcrumbs";
import {Grid} from "../components/Grid";
import {FullScreenButton} from "../components/FullScreenButton";
import {Panel} from "../components/Panel";
import {useTiles} from "../hooks/useTiles";

export const CompanionApp = () => {
    const currentTile = useSelector(state => state.system.currentTile);
    const [ref, Tiles] = useTiles();

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
