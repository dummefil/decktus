import styled, {css} from "styled-components";
import {useSelector} from "react-redux";

export const GridComponent = styled.div`
    display: grid;
    transition: all 0.2s ease-in-out;
    height: 100%;
    width: 100%;
    
    ${({$row, $column}) => {
        return css`
            @media (orientation: landscape) {
                grid-template-columns: repeat(${$column}, minmax(0, 1fr));
                grid-template-rows: repeat(${$row}, 1fr);
            }

            @media (orientation: portrait) {
                grid-template-rows: repeat(${$row}, minmax(0, 1fr));
                grid-template-columns: repeat(${$column}, 1fr);
            }
        `
    }}

`

export const Grid = ({ children, $ref}) => {
    const row = useSelector(state => state.settings.row);
    const column = useSelector(state => state.settings.column);
    return <GridComponent ref={$ref} $row={row} $column={column}>{children}</GridComponent>
}
