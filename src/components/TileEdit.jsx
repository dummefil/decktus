import {Text} from './Text.jsx';
import {useSelector} from "react-redux";

export const TileEdit = () => {
    const settings = useSelector(state => state.system.currentTile);
    const inputs = Object.entries(settings).map(([key, value]) =>
        <Text>`${key} : ${value}\n`</Text>
    );
    return <>
        <Text>Edit</Text>
        {inputs}
    </>
}
