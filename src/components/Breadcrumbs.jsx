import { useSelector} from "react-redux";

export const Breadcrumbs = () => {
    const breadcrumbs = useSelector(state => state.system.breadcrumbs);

    if (breadcrumbs.length === 0) {
        return;
    }

    console.debug(`Moved to path ${breadcrumbs.join(' > ')}`);

    return null;
}
