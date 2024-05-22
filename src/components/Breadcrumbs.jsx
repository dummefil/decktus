import {useDispatch, useSelector} from "react-redux";
import {stepOutFolder} from "../store/system.slice.js";

export const Breadcrumbs = () => {
    const dispatch = useDispatch();
    const breadcrumbs = useSelector(state => state.system.breadcrumbs);

    if (breadcrumbs.length === 0) {
        return;
    }

    const onReturn = () => {
        dispatch(stepOutFolder());
    }

    return <div>
        <button onClick={onReturn}>return</button>
        <div>{breadcrumbs.join(' > ')}</div>
    </div>
}
