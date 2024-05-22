export const TileEdit = ({setTileSettings}) => {
    const returnToMainScreen = () => {
        setTileSettings(null)
    }
    return <>
        <div onClick={returnToMainScreen}>return</div>
        <Text>Edit</Text>
    </>
}
