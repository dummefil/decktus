import './App.css'
import {breadcrumbsStepUp, setActiveTile, toggleEditMode} from "./store/system.slice.js";
import {useDispatch, useSelector} from "react-redux";
import {SettingsData} from "./data/SettingsData.jsx";
//reserved port 8654

const Text = ({children, onClick}) => {
    return <p onClick={onClick} style={{color: '#676767'}}>{children}</p>
}

const TileEdit = ({setTileSettings}) => {
    const returnToMainScreen = () => {
        setTileSettings(null)
    }
    return <>
        <div onClick={returnToMainScreen}>return</div>
        <Text>Edit</Text>
    </>
}

const Tile = ({settings}) => {
    const dispatch = useDispatch();
    const editMode = useSelector(state => state.system.editMode);
    const styles = {
        container: {
            display: 'flex',
            background: 'white',
            aspectRatio: 1,
            borderRadius: 4,
            padding: 8
        }
    }

    const editTile = () => {
        dispatch(toggleEditMode());
    }

    const onClick = () => {
         if (settings.action === 'folder_open') {
             dispatch(setActiveTile(settings));
         } else {
         }
        // console.log(settings.action)
    }

    const Icon = settings.icon;

    return <div style={styles.container} onClick={onClick}>
        {editMode && <Text onClick={editTile}>edit</Text>}
        <Text>{settings.name} {settings.id}</Text>
        {Icon}
    </div>
}

const Grid = ({ children, gap }) => {
    const styles = {
        container: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap,
        }
    }
    return <div style={styles.container}>
        {children}
    </div>
}

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

const Breadcrumbs = () => {
    const dispatch = useDispatch();
    const breadcrumbs = useSelector(state => state.system.breadcrumbs);

    if (breadcrumbs.length === 0) {
        return;
    }

    const onReturn = () => {
        dispatch(breadcrumbsStepUp());
    }

    return <div>
        <button onClick={onReturn}>return</button>
        <div>{breadcrumbs.join(' > ')}</div>
    </div>
}

function App() {
    const editMode = useSelector(state => state.system.editMode);
    const tile = useSelector(state => state.system.tile);
    const tiles = useSelector(state => state.system.tiles);

    //todo theme mode, colors gaps, borders,
    // todo 8 tiles per page/ or from user settings
    //todo fullscreen

    if (editMode && tile) {
        return <TileEdit />
    }

    const tileIsFolder = tile?.type === 'folder';
    const Tiles = tiles
        .map((itemSettings, i) =>
            <Tile key={i} settings={itemSettings}/>
        )
  return (
    <>
        <Breadcrumbs/>
        {tileIsFolder && `Folder ${tile.id}`}
        <EditModeCheckbox/>
        <button>добавить</button>
        <Grid gap={userSettings.gap}>
            {Tiles}
        </Grid>
        <div onClick={openFullscreen}>Open Full Screen</div>
    </>
  )
}

const EditModeCheckbox = () => {
    return (
        <>
            <label htmlFor="editMode">Edit Mode</label>
            <input type="checkbox" onChange={toggleEditMode} id="editMode"/>
        </>
    )
}

export default App
