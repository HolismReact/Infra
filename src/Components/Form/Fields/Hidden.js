import { useState, useEffect, useRef, useContext } from 'react';
import { app, FormContext } from '../FormBase';

const Hidden = ({ column, value }) => {

    const [id, setId] = useState();
    const htmlInput = useRef();
    var formContext = useContext(FormContext);

    useEffect(() => {
        setId(`hidden_${column}`);
    }, [column]);

    useEffect(() => {
        app.addFieldToFormContext(formContext, id, value, true);
        app.on(app.formSubmissionEvent, () => { });
        return () => {
            app.removeListener(app.formSubmissionEvent, () => { });
        }
    }, [id, formContext]);

    return <input
        id={id}
        type="hidden"
        inputRef={htmlInput}
        value={value}
    />
};

export { Hidden }