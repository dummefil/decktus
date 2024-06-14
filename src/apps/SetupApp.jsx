import {Panel} from "../components/Panel";
import { Text } from "../components/Text";
import {Tile} from "../components/Tile/Tile.jsx";
import {FunctionalTile} from "../components/Tile/FunctionalTile.jsx";
import {useSelector} from "react-redux";
import {Grid} from "../components/Grid.jsx";
import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {useTileSize} from "../hooks/useTileSize.jsx";

export const SetupApp = () => {
    const currentTile = useSelector(state => state.system.currentTile);
    const tiles = useSelector(state => state.system.tiles);
    const db = useSelector(state => state.system.db);
    const isInFolder = useSelector(state => state.system.isInFolder);
    const presets = useSelector(state => state.system.presets);
    const tilesCount = useSelector(state => state.settings.tilesCount);
    const ref = useRef(null);
    const size = useTileSize(ref);

    const Tiles = (tiles.length ? tiles : db.slice(0, tilesCount) ).map((itemSettings) => {
        console.log(itemSettings.type);
        return <Tile
            key={itemSettings.id}
            settings={itemSettings}
            size={size}
        />
    })
    if (currentTile && isInFolder) {
        Tiles.unshift(<FunctionalTile size={size} key={'back'}/>)
    }

    return <Panel $flex $row>
        <Panel $flex $column $width={'70%'}>
            <Panel>
                <Grid $ref={ref}>
                    {Tiles}
                </Grid>
            </Panel>
            <Panel $column>
                <Text>This is Edit block</Text>
                {currentTile && Object.entries(currentTile).map((entry) => <p>${entry.join(': ')}</p>)}
            </Panel>
        </Panel>
        <Panel $background={'rgb(85, 85, 85)'} $width={'30%'} $column $padding={0}>
            <Text $align={'center'}>Presets</Text>
            {presets.length && presets.map(presetGroup => <PresetGroup key={presetGroup.id} presetGroup={presetGroup}/>)}
        </Panel>
    </Panel>
}

const PresetEntryContainer = styled.div`
    background: #434343;
    margin-left: -12px;
    margin-right: -12px;
`

const PresetEntry = ({ settings }) => {
    const ref = useRef(null);
    const { id } = settings;

    //todo check if it's leaking
    useEffect(() => {
        const target = ref.current;
        target.addEventListener('dragstart', dragStart);
        function dragStart(e) {
            e.dataTransfer.setData('application/json', JSON.stringify(settings));
        }
        return () => {
            if (target) {
                target.removeEventListener('dragstart', dragStart);
            }
        }
    }, []);
    return <PresetEntryContainer ref={ref} id={id} draggable>{settings.name}</PresetEntryContainer>
}

const PresetGroupContainer = styled.div`
    background: #2c2c2c;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    padding-left: 12px;
    padding-right: 12px;
`

const PresetGroup = ({ presetGroup }) => {
    const [opened, setOpened] = useState(false);
    const toggleGroup = () => {
        setOpened(!opened);
    }

    return <PresetGroupContainer onClick={toggleGroup}>
        <Text>{presetGroup.name}</Text>
        {opened && presetGroup.children.map((settings) => <PresetEntry key={settings.id} settings={settings}/>)}
    </PresetGroupContainer>
}
