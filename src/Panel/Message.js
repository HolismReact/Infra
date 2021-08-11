import Holism from '../Base/Holism';
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// import MuiAlert from '@material-ui/lab/Alert';

// function Alert(props) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const Message = () => {
    const [isShown, setIsShown] = useState();
    const [message, setMessage] = useState();
    const [action, setAction] = useState();
    const [type, setType] = useState();
    const [id, setId] = useState(Holism.randomId());
    const [classes, setClasses] = useState('');

    useEffect(() => {
        const show = ({ message, action, type }) => {
            setMessage(message);
            setAction(action);
            setType(type);
        }
        Holism.on(Holism.showMessage, show);
        return () => {
            Holism.removeListener(Holism.showMessage, show);
        };
    }, []);

    useEffect(() => {
        if (message) {
            setId(Holism.randomId());
            setIsShown(true);
        }
    }, [message]);

    useEffect(() => {
        if (type === 'success') {
            setClasses('bg-green-400 text-white');
        }
        else if (type === 'info') {
            setClasses('bg-blue-400 text-white');
        }
        else if (type === 'warning') {
            setClasses('bg-yellow-400 text-gray-900');
        }
        else if (type === 'error') {
            setClasses('bg-red-400 text-white-900');
        }
        else {
            setClasses(null);
        }
    }, [type]);

    const hide = () => {
        setMessage(null);
        setIsShown(false);
    }

    return <Snackbar
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        key={id}
        type={type}
        className={classes + ' rounded-md'}
        ContentProps={{
            className: classes
        }}
        open={isShown}
        autoHideDuration={60000}
        onClose={hide}
        message={message}
        action={
            <>
                {
                    action
                        ?
                        action
                        :
                        null
                }
                <IconButton size="small" aria-label="close" color="inherit" onClick={hide}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </>
        }
    />
}

export default Message;