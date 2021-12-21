import { useState, useEffect, useRef, useContext } from 'react';
import { app, FormContext } from '@Form';

const Hidden = ({ column, value }) => {

    const [id, setId] = useState();
    const htmlInput = useRef();
    var formContext = useContext(FormContext);

    useEffect(() => {
        setId(`hidden_${column}`);
    }, [column]);

    useEffect(() => {
        app.addFieldToFormContext(formContext, id, value, true);
        app.on(app.formSubmitted, () => { });
        return () => {
            app.removeListener(app.formSubmitted, () => { });
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