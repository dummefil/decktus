import {useDispatch} from "react-redux";
import {stepInFolder} from "../../store/system.slice.js";
import {Text} from '../Text.jsx';
import {Icon} from "../Icon.jsx";
import'./Tile.css';
import {TILE_DATA_TYPES} from "../../data/TileTypes.js";

export const Tile = ({ settings }) => {
    const dispatch = useDispatch();

    const onClick = () => {
        if (settings.type === TILE_DATA_TYPES.FUNCTIONAL) {
            if (typeof settings.action === "function") {
                settings.action();
            } else {
                console.debug(settings.action);
            }
            return;
        }
        if (settings.type === TILE_DATA_TYPES.FOLDER) {
            dispatch(stepInFolder(settings));
            return;
        }
    }

    return <div className={'tile-container'} onClick={onClick}>
        <div className={'tile-header'}>
            <Text>{settings.name}</Text>
        </div>
        <Icon width={'80%'} height={'80%'} name={settings.icon}/>
    </div>
}
