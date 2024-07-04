import styled from "styled-components";

export const TileHeader = styled.div`
    color: #676767;
    position: absolute;
    width: 100%;
    display: flex;
    top: 0;
    justify-content: center;
    align-items: ${({ $position }) => {
        if ($position === 'top') {
            return 'start';
        }
        if ($position === 'bottom') {
            return 'end';
        }
        if ($position === 'center') {
            return 'center';
        }
        
        return 'start'
    }};
    left: 0;
    padding: 4px;
    height: 100%;
`
