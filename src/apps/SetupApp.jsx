import {Panel} from "../components/Panel";
import {Text} from "../components/Text";
import {useSelector} from "react-redux";
import {Grid} from "../components/Grid";
import {useTiles} from "../hooks/useTiles";
import {PresetGroup} from "../components/Preset/PresetGroup";

export const SetupApp = () => {
    const currentTile = useSelector(state => state.system.currentTile);
    const presets = useSelector(state => state.system.presets);
    const [ref, Tiles] = useTiles()

    return <Panel $flex $row>
        <Panel $flex $column $width={'70%'}>
            <Panel>
                <Grid $ref={ref}>
                    {Tiles}
                </Grid>
            </Panel>
            <Panel $column>
                <Text>This is Edit block</Text>
                {currentTile && Object.entries(currentTile).map((entry) => <Text>{entry.join(': ')}</Text>)}
            </Panel>
        </Panel>
        <Panel $background={'rgb(85, 85, 85)'} $width={'30%'} $column $padding={0}>
            <Text $align={'center'}>Presets</Text>
            {presets.length && presets.map(presetGroup => <PresetGroup key={presetGroup.id} presetGroup={presetGroup}/>)}
        </Panel>
    </Panel>
}
