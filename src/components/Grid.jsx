import styled, {css} from "styled-components";

export const Grid = styled.div`
    display: grid;
    transition: all 0.2s ease-in-out;
    gap: 15px;
    height: 100%;
    width: 100%;
    
    ${({ $column, $row }) => {
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
