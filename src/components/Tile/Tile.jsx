import {useDispatch} from "react-redux";
import {setTile, stepInFolder} from "../../store/system.slice.js";
import {Text} from '../Text';
import {Icon} from "../Icon";
import * as TILE_DATA_TYPES from "../../data/TileTypes.js";
import {TileHeader} from "./TileHeader";
import {TileContainer} from "./TileContainer";
import {useEffect, useRef, useState} from "react";

export const Tile = ({ settings }) => {
    const dispatch = useDispatch();
    const ref = useRef(null);
    const [dropped, setDropped] = useState('');
    useEffect(() => {
        const target = ref.current;
        target.addEventListener('dragenter', dragEnter)
        target.addEventListener('dragover', dragOver);
        target.addEventListener('dragleave', dragLeave);
        target.addEventListener('drop', drop);
        function dragEnter(e) {
            e.preventDefault();
        }

        function dragOver(e) {
            e.preventDefault();
        }

        function dragLeave(e) {
        }

        function drop(e) {
            const _settings = JSON.parse(e.dataTransfer.getData('application/json'));
            setDropped(_settings.name);
            const tile = {
                ..._settings,
                id: settings.id
            }
            dispatch(setTile(tile))
        }
        return () => {
            if (target) {
                target.removeEventListener('dragenter', dragEnter)
                target.removeEventListener('dragover', dragOver);
                target.removeEventListener('dragleave', dragLeave);
                target.removeEventListener('drop', drop);
            }
        }
    }, []);

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

    return <TileContainer ref={ref} onClick={onClick}>
        <TileHeader>
            <Text>{dropped}</Text>
        </TileHeader>
        {settings.icon && <Icon width={'80%'} height={'80%'} name={settings.icon}/>}
    </TileContainer>
}
