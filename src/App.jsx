import './App.css'
import {useEffect, useState} from "react";

//reserved port 8654

const Text = ({children, onClick}) => {
    return <p onClick={onClick} style={{color: '#676767'}}>{children}</p>
}

const TileSetup = ({setTileSettings}) => {
    const returnToMainScreen = () => {
        setTileSettings(null)
    }
    return <>
        <div onClick={returnToMainScreen}>return</div>
        <Text>Edit</Text>
    </>
}


const Tile = ({editMode, setTileEditing, settings} ) => {
    const styles = {
        container: {
            display: 'flex',
            background: 'white',
            height: '100px',
            width: '100px'
        }
    }

    const editTile = () => {
        setTileEditing(settings)
    }

    return <div style={styles.container}>
        {editMode && <Text onClick={editTile}>edit</Text>}
        <Text>{settings.name}</Text>
    </div>
}

const Grid = ({ children, gap }) => {
    const styles = {
        container: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap,
            gridAutoRows: 'minmax(100px, auto)'
        }
    }
    return <div style={styles.container}>
        {children}
    </div>
}
const userSettings = {
    gap: 10
}

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
    const [editMode, setEditMode] = useState(false);
    const [tileSettings, setTileSettings] = useState(null);
    //todo theme mode, colors gaps, borders,

    //todo fullscreen
    if (editMode && tileSettings) {
        return <TileSetup setTileSettings={setTileSettings}/>
    }

    const changeEditMode = () =>{
        debugger
        setEditMode(!editMode)
    }

    const array = new Array(10).fill({
        name: 'Tile name',
        icon: 'Some icon',
        action: 'Sends request to server'
    });
    const Tiles = array.map((itemSettings) => <Tile editMode={editMode} setTileEditing={setTileSettings} settings={itemSettings}/>)

  return (
    <>
        <label htmlFor="editMode" >Edit Mode</label>
        <input type="checkbox" onChange={changeEditMode} id="editMode"/>
        <Grid gap={userSettings.gap}>
            {Tiles}
        </Grid>
        <div onClick={openFullscreen}>Open Full Screen</div>
    </>
  )
}

export default App
