import {Tile} from "./Tile";
import {useDispatch} from "react-redux";
import {stepOutFolder} from "../../store/system.slice";

export const FunctionalTile = ({ icon, action, size }) => {
    const dispatch = useDispatch();

    const settings = {
        icon: 'back',
        type: 'functional',
        action: () => {
            dispatch(stepOutFolder())
        }
    }
    return <Tile key={'back-button'} size={size} settings={settings}/>
}
