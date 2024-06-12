import styled, {css} from "styled-components";

export const Text = styled.p`
    color: #a1a1a1;
    width: 100%;
    ${(props) => css`
        text-align: ${props.$align || 'initial'};
    `}
`
