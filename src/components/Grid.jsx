import './Grid.css'

export const Grid = ({children, gap}) => {
    return <div className={'grid-container'}>
        {children}
    </div>
}
