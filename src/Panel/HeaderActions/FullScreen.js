import React, { useState } from 'react';
import { HeaderAction } from './HeaderAction';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import app from '../../Base/App';

const FullScreen = () => {

    const [isFullScreen, setIsFullScreen] = useState(document.webkitIsFullScreen);

    return <HeaderAction
        title="Full screen"
        icon={
            isFullScreen
                ?
                FullscreenExitIcon
                :
                FullscreenIcon
        }
        action={() => {
            if (document.fullscreenEnabled) {
                if (document.webkitIsFullScreen) {
                    document.exitFullscreen();
                    setIsFullScreen(false);
                } else {
                    document.documentElement.requestFullscreen();
                    setIsFullScreen(true);
                }
            } else {
                app.warning("Your browser does not support fullscreen.");
            }
        }}
    />
}

export { FullScreen }