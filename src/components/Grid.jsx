export const Grid = ({children, gap}) => {
    const styles = {
        container: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap,
        }
    }
    return <div style={styles.container}>
        {children}
    </div>
}
