import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button'
import Holism from '../../Base/Holism';

export const FormContext = React.createContext();

const defaultActions =
    <>
        <Button type="submit">Save</Button>
        <Button>Cancel</Button>
    </>

const Form = (prop) => {
    // is edit, or is create? get id from somewhere
    // file upload
    // if is edit, load entity (only if they don't provide their own get method)
    // save

    const [fields, setFields] = useState([]);
    const [data, setData] = useState({});

    useEffect(() => {
        console.log(data);
    }, [data]);

    useEffect(() => {
        console.log(fields);
    }, [fields]);

    Holism.eventEmitter.removeAllListeners('holism_form_submission_requested');

    const handleSubmit = (event) => {
        Holism.emit('holism_form_submission_requested');
        event.preventDefault();
    }

    return <FormContext.Provider value={{ fields: [fields, setFields], data: [data, setData] }}>
        <form
            noValidate
            onSubmit={handleSubmit}
        >
            {prop.fields}
            {
                prop.actions || defaultActions
            }
        </form>
    </FormContext.Provider>
}

export default Form;