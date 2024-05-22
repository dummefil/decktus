import {toggleEditMode} from "../store/system.slice.js";
import {useDispatch} from "react-redux";

export const EditModeCheckbox = () => {
    const dispatch = useDispatch();
    const onToggle = () => {
        dispatch(toggleEditMode());
    }
    return (
        <>
            <label htmlFor="editMode">Edit Mode</label>
            <input type="checkbox" onChange={onToggle} id="editMode"/>
        </>
    )
}
