import styled from "styled-components";

export const Grid = styled.div`
    display: grid;
    transition: all 0.2s ease-in-out;
    gap: 15px;
    height: 100%;

    @media (orientation: landscape) {
        grid-template-columns: repeat(6, minmax(0, 1fr));
        grid-template-rows: repeat(3, 1fr);
    }

    @media (orientation: portrait) {
        grid-template-columns: repeat(2, 1fr);
        /*grid-template-rows: repeat(6, 1fr);*/
    }
`
