import styled, {css} from "styled-components";

const buildPanel  = (props) => {
    const styles = [
        'display: flex',
        `flex: 0 1 ${props.$width || '100%'} !important`,
        `background: ${props.$background || '#494949'} !important`,
        `padding: ${props.$padding !== undefined ? props.$padding : '8px 12px'}`,
        `margin: ${props.$margin || 0}`,
        `border-radius: 8px`,
        'overflow: hidden',
        'height: 100%'
    ];

    if (props.$column) {
        styles.push('flex-direction: column')
    } else
    if (props.$row) {
        styles.push('flex-direction: row')
    }
    //todo support breakpoints
    // props.$sm-row
    // props.$xs-row

    return styles.join(';\n');
}

export const Panel = styled.div`
    ${(props) => {
        const modelStyles = buildPanel(props)
        return css`
            ${modelStyles};
            &:has(${Panel}) {
                padding: 0;
            }
            ${Panel} {
                background: none;
                flex: 100%;
                border-radius: initial;
            }
        `
        }
    }}
`
