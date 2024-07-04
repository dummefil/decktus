import {useState} from "react";
import {PresetGroupContainer} from "./PresetGroupContainer";
import {Text} from "../Text";
import {PresetEntry} from "./PresetEntry";
import {PresetIcon} from "./PresetIcon";
import styled from "styled-components";

const PresetGroupCollapsable = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    padding: 4px;
`
export const PresetGroup = ({presetGroup}) => {
    const [opened, setOpened] = useState(true);
    const toggleGroup = () => {
        setOpened(!opened);
    }

    return <PresetGroupContainer onClick={toggleGroup}>
        <PresetGroupCollapsable>
            {}
            <PresetIcon icon={presetGroup.icon}></PresetIcon>
            <Text>{presetGroup.name}</Text>
        </PresetGroupCollapsable>
        {opened && presetGroup.children.map((settings) => <PresetEntry key={settings.id} settings={settings}/>)}
    </PresetGroupContainer>
}
