import {useDispatch} from "react-redux";
import {setTile, stepInFolder} from "../../store/system.slice.js";
import {Text} from '../Text';
import {Icon} from "../Icon";
import * as TILE_DATA_TYPES from "../../data/TileTypes.js";
import {TileHeader} from "./TileHeader";
import {TileContainer} from "./TileContainer";
import {useRef, useState} from "react";

export const Tile = ({ settings, size }) => {
    const dispatch = useDispatch();
    const ref = useRef(null);
    const [dropped, setDropped] = useState('');
    const [isActive, setIsActive] = useState(false);

    const dragEnter = (e) => {
        e.preventDefault();
        setIsActive(true);
    }

     const dragOver = (e) => {
        e.preventDefault();
    }

    const dragLeave = (e) => {
        e.preventDefault();
        setIsActive(false);
    }

    const drop = (e) => {
        e.stopPropagation();
        const _settings = JSON.parse(e.dataTransfer.getData('application/json'));
        setDropped(_settings.name);
        const tile = {
            ..._settings,
            id: settings.id
        }
        dispatch(setTile(tile))
        setIsActive(false);
    }

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
        }
    }

    return <TileContainer onDragEnter={dragEnter} onDrop={drop} onDragOver={dragOver} onDragLeave={dragLeave} $isActive={isActive} ref={ref} onClick={onClick} $calculatedSize={size}>
        <TileHeader>
            <Text>{dropped}</Text>
        </TileHeader>
        {settings.icon && <Icon width={'80%'} height={'80%'} name={settings.icon}/>}
    </TileContainer>
}
