import {lazy, startTransition, Suspense, useEffect, useState} from "react";
import styled from "styled-components";

const cache = {};

const StyledIcon = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  color: ${({ color }) => color};
`;


export const Icon = ({
         name,
         width = 32,
         height = 32,
         color,
         onClick
     }) => {
    const [SelectedIcon, setSelectedIcon] = useState(null);
    const styles = {
        width,
        height,
        color,
    };

    useEffect(() => {
        if (cache[name]) {
            setSelectedIcon(cache[name]);
        } else {
            startTransition(() => {
                const IconComponent = lazy(() => import(`../icons/${name}.svg?react`));
                cache[name] = IconComponent;
                setSelectedIcon(IconComponent);
            });
        }
    }, [name]);


    return (
        <Suspense>
            <StyledIcon as={SelectedIcon} onClick={onClick} width={width} height={height} color={color} role="img" />
        </Suspense>
    );
};
