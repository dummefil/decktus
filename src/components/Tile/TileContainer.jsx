import styled from "styled-components";
import {Text} from "../Text.jsx";

export const TileContainer = styled.div`
    display: flex;
    background: rgb(31, 31, 31);
    border: solid 3px rgb(61, 61, 61);
    border-radius: 20px;
    padding: 8px;
    position: relative;
    justify-content: center;
    align-items: center;
    ${Text} {
        text-align: center;
    }
`
