import {useEffect, useRef} from "react";
import {PresetEntryContainer} from "./PresetEntryContainer";

export const PresetEntry = ({settings}) => {
    const ref = useRef(null);
    const {id} = settings;

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
