import styled from "styled-components";
import {Text} from "../Text";

export const TileContainer = styled.div`
    display: flex;
    background: rgb(31, 31, 31);
    border-radius: 20px;
    padding: 8px;
    position: relative;
    justify-content: center;
    align-items: center;
    transition: 0.2s all;
    border: solid 3px ${({$isActive}) => $isActive ? '#ffc758' : 'rgb(61, 61, 61)'};
    
    height: ${({ $calculatedSize }) => $calculatedSize}px;
    width: ${({$calculatedSize}) => $calculatedSize}px;
    ${Text} {
        text-align: center;
    }
    * {
        pointer-events: none;
    }
`
