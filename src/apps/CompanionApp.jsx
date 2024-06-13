import {useSelector} from "react-redux";
import {Tile} from "../components/Tile/Tile";
import {FunctionalTile} from "../components/Tile/FunctionalTile.jsx";
import {Breadcrumbs} from "../components/Breadcrumbs";
import {Grid} from "../components/Grid";
import {FullScreenButton} from "../components/FullScreenButton";
import {Panel} from "../components/Panel.jsx";
import {useEffect, useRef, useState} from "react";

export const CompanionApp = () => {
    const currentTile = useSelector(state => state.system.currentTile);
    const tiles = useSelector(state => state.system.tiles);
    const row = useSelector(state => state.settings.row);
    const column = useSelector(state => state.settings.column);
    const ref = useRef(null);

    const [height, setHeight] = useState(150);
    const [width, setWidth] = useState(150);

    useEffect(() => {
        const _height = (ref.current.offsetHeight / row) - 24;
        const _width = (ref.current.offsetWidth / column) - 16;

        setHeight(_height)
        setWidth(_width)

        console.log(_height, _width);
    }, [ref]);

    const Tiles = tiles.map((itemSettings) => {
        return <Tile
            key={itemSettings.id}
            settings={itemSettings}
            height={height}
            width={width}
        />
        }
    )
    if (currentTile) {
        Tiles.unshift(<FunctionalTile key={'back'}/>)
    }

    return (
        <Panel ref={ref} $column>
            <Breadcrumbs/>
            {currentTile && console.debug(`Folder opened ${currentTile.id}`)}
            <Grid $column={column} $row={row}>
                {Tiles}
            </Grid>
            <FullScreenButton/>
        </Panel>
    )
}
