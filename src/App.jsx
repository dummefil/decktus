import './App.css'
import {useSelector} from "react-redux";
import {SettingsData} from "./data/SettingsData.jsx";
import {Tile} from "./components/Tile.jsx";
import {TileEdit} from "./components/TileEdit.jsx";
import {Grid} from "./components/Grid.jsx";
import {EditModeCheckbox} from "./components/EditModeCheckbox.jsx";
import {Breadcrumbs} from "./components/Breadcrumbs.jsx";
import {FunctionalTile} from "./components/FunctionalTile.jsx";
//reserved port 8654

const userSettings = new SettingsData();

function openFullscreen() {
    const elem = document.querySelector('#root')
    if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(err => console.error(err));
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
    screen.orientation.lock('landscape').then(res=>console.log(res)).catch(err=>console.log(err))
}

function App() {
    const editMode = useSelector(state => state.system.editMode);
    const currentTile = useSelector(state => state.system.currentTile);
    const tiles = useSelector(state => state.system.tiles);

    //todo theme mode, colors gaps, borders,
    // todo 8 tiles per page/ or from user settings

    if (editMode && currentTile) {
        return <TileEdit />
    }

    const Tiles = tiles.map((itemSettings, i) => <Tile key={i} settings={itemSettings}/>)
    if (currentTile) {
        Tiles.unshift(<FunctionalTile/>)
    }

    return (
        <>
            <Breadcrumbs/>
            {currentTile && `Folder ${currentTile.id}`}
            <EditModeCheckbox/>
            <button>добавить</button>
            <Grid gap={userSettings.gap}>
                {Tiles}
            </Grid>
            <div onClick={openFullscreen}>Open Full Screen</div>
    </>
  )
}

export default App
