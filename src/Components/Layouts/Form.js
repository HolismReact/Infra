import React from 'react';
import Button from '@material-ui/core/Button'

export const FormContext = React.createContext({ name: 'formContextDefaultValue' });

const defaultActions =
    <>
        <Button>Save</Button>
        <Button>Cancel</Button>
    </>

const Form = (prop) => {
    return <FormContext.Provider value={{}}>
        <form>
            {prop.fields}
            {
                prop.actions || defaultActions
            }
        </form>
    </FormContext.Provider>
}

export default Form;