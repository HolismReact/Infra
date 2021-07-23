import React, {
    createElement,
    useRef,
    useEffect,
} from 'react';
import classnames from 'classnames';
import { Card, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import { useHistory } from 'react-router-dom';
import { useCheckAuth } from 'ra-core';
import LoginForm from './LoginForm';
import { Notification } from 'react-admin';

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        height: '1px',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundImage:
            'radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)',
    },
    card: {
        minWidth: 300,
        marginTop: '6em',
    },
    avatar: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {
        backgroundColor: theme.palette.secondary[500],
    },
}),
    { name: 'RaLogin' }
);

const Login = props => {
    const {
        theme,
        title,
        classes: classesOverride,
        className,
        children,
        staticContext,
        backgroundImage,
        ...rest
    } = props;
    const containerRef = useRef();
    const classes = useStyles(props);
    const checkAuth = useCheckAuth();
    const history = useHistory();
    useEffect(() => {
        checkAuth({}, false)
            .then(() => {
                // already authenticated, redirect to the home page
                history.push('/');
            })
            .catch(() => {
                // not authenticated, stay on the login page
            });
    }, [checkAuth, history]);

    return (
        <div
            className={classnames(classes.main, className)}
            {...rest}
            ref={containerRef}
        >
            <Card className={classes.card}>
                <div className={classes.avatar}>
                    <Avatar className={classes.icon}>
                        <LockIcon />
                    </Avatar>
                </div>
                <LoginForm />
            </Card>
            {Notification ? createElement(Notification) : null}
        </div>
    );
};

export default Login;