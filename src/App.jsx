import './App.css'
import {useSelector} from "react-redux";
import {SettingsData} from "./data/SettingsData.jsx";
import {Tile} from "./components/Tile/Tile.jsx";
import {Grid} from "./components/Grid.jsx";
import {Breadcrumbs} from "./components/Breadcrumbs.jsx";
import {FunctionalTile} from "./components/FunctionalTile.jsx";
import {FullScreenButton} from "./FullScreenButton.jsx";
//reserved port 16341

const userSettings = new SettingsData();

function App() {
    const currentTile = useSelector(state => state.system.currentTile);
    const tiles = useSelector(state => state.system.tiles);

    //todo theme mode, colors gaps, borders,
    // todo 8 tiles per page/ or from user settings

    const Tiles = tiles.map((itemSettings) => <Tile key={itemSettings.id} settings={itemSettings}/>)
    if (currentTile) {
        Tiles.unshift(<FunctionalTile key={'back'}/>)
    }

    return (
        <>
            <Breadcrumbs/>
            {currentTile && console.debug(`Folder opened ${currentTile.id}`)}
            <Grid gap={userSettings.gap}>
                {Tiles}
            </Grid>
            {/*<FullScreenButton/>*/}
    </>
  )
}

export default App
