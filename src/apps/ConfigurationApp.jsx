import {Panel} from "../components/Panel";
import {Text} from "../components/Text";
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "../components/Grid";
import {useTiles} from "../hooks/useTiles";
import {PresetGroup} from "../components/Preset/PresetGroup";
import {BLANK, FOLDER} from "../data/TileTypes.js";
import {Icon} from "../components/Icon.jsx";
import {stepInFolder} from "../store/system.slice.js";

const DEBUG = true;

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const TileEdit = ({ settings }) => {
    const currentTile = useSelector(state => state.system.currentTile);
    const dispatch = useDispatch();

    const { icon, id, linkedTo, name, type } = settings;
    return <Panel $column>
        <Text>Name: {name || type}</Text>
        <Panel >
            <Panel>
                <Icon name={icon}/>
            </Panel>
            <Panel $column>
                {DEBUG && <Text>DEBUG ID: {id}</Text>}
                {DEBUG && type === FOLDER && <Text>DEBUG LINKED_TO: {linkedTo?.length && linkedTo.join(', ') || '[]'}</Text>}
                {type === FOLDER && <Text>
                    Content: {linkedTo.length || 0}
                    {currentTile.id !== settings.id && <button onClick={() => dispatch(stepInFolder(settings))}>{'>'}</button>}
                </Text>}
            </Panel>
        </Panel>
    </Panel>
}

const key = 'decktus_DB';
const save = (db) => {
    const json = JSON.stringify(db);
    console.log('saved', json);
    localStorage.setItem(key, json);
}

export const ConfigurationApp = () => {
    const currentTile = useSelector(state => state.system.currentTile);
    const presets = useSelector(state => state.system.presets);
    const db = useSelector(state => state.system.db);
    const [ref, Tiles] = useTiles()

    return <Panel $flex $row>
        <Panel $flex $column $width={'70%'}>
            <Panel>
                <Grid $ref={ref}>
                    {Tiles}
                </Grid>
            </Panel>
            <Panel $column>
                {!currentTile && 'Drag an action from the right and drop it on an empty key above.'}
                {currentTile && currentTile.type === BLANK && 'Drag an action from the right and drop it on an empty key above.'}
                {currentTile && <TileEdit key={currentTile.id} settings={currentTile}/>}
            </Panel>
        </Panel>
        <Panel $background={'rgb(85, 85, 85)'} $width={'30%'} $column $padding={0}>
            <Text $align={'center'}>Presets</Text>
            {presets.length && presets.map(presetGroup => <PresetGroup key={presetGroup.id} presetGroup={presetGroup}/>)}
        </Panel>
        <button onClick={() => save(db)}>save</button>
    </Panel>
}
