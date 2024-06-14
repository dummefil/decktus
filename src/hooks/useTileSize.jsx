import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

export const useTileSize = (ref) => {
    const row = useSelector(state => state.settings.row);
    const column = useSelector(state => state.settings.column);
    const [size, setSize] = useState(null)
    useEffect(() => {
        const _height = (ref.current.offsetHeight - 16) / row;
        const _width = (ref.current.offsetWidth - 24) / column;
        const size = Math.min(_width, _height);
        setSize(size)
    }, [column, ref, row]);

    return size
}
