import {Tile} from "./Tile.jsx";
import {useDispatch} from "react-redux";
import {stepOutFolder} from "../store/system.slice.js";

export const FunctionalTile = () => {
    const dispatch = useDispatch();

    const settings = {
        icon: 'back',
        type: 'functional',
        action: () => {
            dispatch(stepOutFolder())
        }
    }
    return <Tile key={'back-button'} settings={settings}/>
}
