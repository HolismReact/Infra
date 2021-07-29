import React from 'react';
import Button from '@material-ui/core/Button'

export const FormContext = React.createContext({ name: 'formContextDefaultValue' });

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

    const handleSubmit = (event) => {
        console.log(event);
        event.preventDefault();
    }

    return <FormContext.Provider value={{}}>
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