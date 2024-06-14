import {useState} from "react";
import styled from "styled-components";

const Button = styled.button`
    display: flex;
    height: 50px;
    width: 50px;
    position: absolute;
    top: 10px;
    left: 10px;
`

function openFullscreen(fullScreen, setFullScreen) {
    const elem = document.querySelector('body');

    if (fullScreen) {
        setFullScreen(false);
        screen.orientation.unlock();
    } else {
        setFullScreen(true)
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(err => console.error(err));
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
        screen.orientation.lock('landscape').then(res=>console.log(res)).catch(()=>setFullScreen(false))
    }
}


export const FullScreenButton = () => {
    const [fullScreen, setFullScreen] = useState(false)
    return <Button onClick={() => openFullscreen(fullScreen, setFullScreen)}></Button>
}
