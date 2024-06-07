import {lazy, Suspense} from "react";

export const Icon = ({
    name,
    width = 32,
    height = 32,
    color,
    onClick
}) => {
    const styles = {
        width,
        height,
        color,
    }
    let SelectedIcon = lazy(() => import(`../icons/${name}.svg?react`))

    return <Suspense>
        <SelectedIcon onClick={onClick} style={styles} />
    </Suspense>
}
