import {useDispatch, useSelector} from "react-redux";
import {setTile, stepInFolder} from "../../store/system.slice";
import {Text} from '../Text';
import {Icon} from "../Icon";
import * as TILE_DATA_TYPES from "../../data/TileTypes";
import {TileHeader} from "./TileHeader";
import {TileContainer} from "./TileContainer";
import {useEffect, useRef, useState} from "react";
import {BLANK} from "../../data/TileTypes";

export const Tile = ({ settings, size }) => {
    const isEditMode = useSelector(state => state.system.isEditMode);
    const currentTile = useSelector(state => state.system.currentTile);
    const dispatch = useDispatch();

    const ref = useRef(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setIsActive(settings.id === currentTile?.id)
    }, [currentTile, settings.id]);

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
        const tile = {
            ..._settings,
            id: settings.id
        }
        dispatch(setTile(tile))
        setIsActive(false);
    }

    const onClick = () => {
        if (isEditMode && currentTile?.id !== settings.id && settings.type !== BLANK) {
            setIsActive(true);
            const { action, ...rest } = settings;
            dispatch(setTile(rest))
        }

        if (currentTile?.id === settings.id || !isEditMode) {
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
    }

    return <TileContainer onDragEnter={dragEnter} onDrop={drop} onDragOver={dragOver} onDragLeave={dragLeave} $isActive={isActive} ref={ref} onClick={onClick} $calculatedSize={size}>
        <TileHeader>
            <Text>{settings.id}</Text>
        </TileHeader>
        <TileHeader $position={'bottom'}>
            <Text>{settings.name}</Text>
        </TileHeader>
        {settings.icon && <Icon width={'80%'} height={'80%'} name={settings.icon}/>}
    </TileContainer>
}
