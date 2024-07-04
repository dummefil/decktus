import {useEffect, useRef} from "react";
import {PresetEntryContainer} from "./PresetEntryContainer";
import {PresetIcon} from "./PresetIcon.jsx";
import { Text } from '../Text.jsx';

export const PresetEntry = ({settings}) => {
    const ref = useRef(null);
    const  { id, icon } = settings;

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

    return <PresetEntryContainer ref={ref} id={id} draggable>
        <PresetIcon icon={icon}/>
        <Text>{settings.name}</Text>
    </PresetEntryContainer>
}
