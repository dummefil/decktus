import { useSelector} from "react-redux";

export const Breadcrumbs = () => {
    const breadcrumbs = useSelector(state => state.system.breadcrumbs);

    if (breadcrumbs.length === 0) {
        return;
    }

    return <div>
        <div>{breadcrumbs.join(' > ')}</div>
    </div>
}
