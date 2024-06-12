import {Panel} from "../components/Panel";
import { Text } from "../components/Text";
import {Tile} from "../components/Tile/Tile.jsx";
import {FunctionalTile} from "../components/FunctionalTile.jsx";
import {useSelector} from "react-redux";
import {Grid} from "../components/Grid.jsx";
import {useEffect, useRef, useState} from "react";
import styled from "styled-components";

export const SetupApp = () => {
    const currentTile = useSelector(state => state.system.currentTile);
    const tiles = useSelector(state => state.system.tiles);

    const Tiles = tiles.map((itemSettings) => <Tile key={itemSettings.id} settings={itemSettings}/>)
    if (currentTile) {
        Tiles.unshift(<FunctionalTile key={'back'}/>)
    }


    return <Panel $flex $row>
        <Panel $flex $column $width={'70%'}>
            <Panel>
                <Grid>
                    {Tiles}
                </Grid>
            </Panel>
            <Panel>
                <Text>This is Edit block</Text>
            </Panel>
        </Panel>
        <Panel $background={'rgb(85, 85, 85)'} $width={'30%'} $column $padding={0}>
            <Text $align={'center'}>Presets</Text>
            <PresetGroup/>
            <PresetGroup/>
            <PresetGroup/>
        </Panel>
    </Panel>
}

const PresetEntryContainer = styled.div`
    background: #434343;
    padding: 10px;
`

const PresetEntry = ({ children, draggable, id }) => {
    const ref = useRef(null);

    //todo check if it's leaking
    useEffect(() => {
        const target = ref.current;
        target.addEventListener('dragstart', dragStart);
        function dragStart(e) {
            console.log(e.target);
            e.dataTransfer.setData('text/plain', e.target.id);
        }
        return () => {
            if (target) {
                target.removeEventListener('dragstart', dragStart);
            }
        }
    }, []);
    return <PresetEntryContainer ref={ref} id={id} draggable={draggable}>{children}</PresetEntryContainer>
}

const PresetGroupContainer = styled.div`
    background: #2c2c2c;
    cursor: pointer;
`

const PresetGroup = () => {
    const [entries] = useState([
        'buba',
        'baba',
        'hubabuba'
    ]);
    const [opened, setOpened] = useState(false);

    const toggleGroup = () => {
        setOpened(!opened);
    }

    return <PresetGroupContainer onClick={toggleGroup}>
        <Text $align>This is group</Text>
        {opened && entries.map((entry) => <PresetEntry id={entry} draggable key={entry}>{entry}</PresetEntry>)}
    </PresetGroupContainer>
}
