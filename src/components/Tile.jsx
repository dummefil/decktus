import {useDispatch, useSelector} from "react-redux";
import {stepInFolder, toggleEditMode} from "../store/system.slice.js";
import {Text} from './Text.jsx';
import {Icon} from "./Icon.jsx";

export const Tile = ({settings}) => {
    const dispatch = useDispatch();
    const editMode = useSelector(state => state.system.editMode);
    const styles = {
        container: {
            display: 'flex',
            background: '#efefef',
            aspectRatio: 1,
            borderRadius: 4,
            padding: 8,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
        },
        headerRow: {
            color: '#676767',
            position: 'absolute',
            width: '100%',
            display: 'flex',
            top: 0,
            justifyContent: editMode ? 'space-between' : 'center',
            alignItems: 'center',
            left: 0,
            padding: 4,
        }
    }

    const editTile = () => {
        dispatch(toggleEditMode());
    }

    const onClick = () => {
        if (settings.type === 'functional') {
            settings.action();
        }
        if (editMode) {
            console.log(`editing ${settings.id}`)
        }
        if (settings.action === 'folder_open') {
            dispatch(stepInFolder(settings));
        }
    }

    return <div style={styles.container} onClick={onClick}>
        <div style={styles.headerRow}>
            <Text>{settings.name} {settings.id}</Text>
            {editMode && <Icon onClick={editTile} width={20} height={20} name="edit"/>}
        </div>
        <Icon width={'80%'} height={'80%'} name={settings.icon}/>
    </div>
}
