import {useState} from "react";
import {PresetGroupContainer} from "./PresetGroupContainer";
import {Text} from "../Text";
import {PresetEntry} from "./PresetEntry";

export const PresetGroup = ({presetGroup}) => {
    const [opened, setOpened] = useState(true);
    const toggleGroup = () => {
        setOpened(!opened);
    }

    return <PresetGroupContainer onClick={toggleGroup}>
        <Text>{presetGroup.name}</Text>
        {opened && presetGroup.children.map((settings) => <PresetEntry key={settings.id} settings={settings}/>)}
    </PresetGroupContainer>
}
