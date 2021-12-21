import React, { useState, useEffect, useContext } from 'react';
import { post } from '../../Base/Api';
import { ListContext } from '../List/List';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import app from '../../Base/App';
import Page from '../Page/Page';

export const FormContext = React.createContext();

const Form = ({ entity, title, explanations, inputs, actions, large }) => {
    // is edit, or is create? get id from somewhere
    // file upload
    // if is edit, load entity (only if they don't provide their own get method)
    // save
    const { isDialogFormOpen, setIsDialogFormOpen } = useContext(ListContext);
    const [fields, setFields] = useState([]);
    const [progress, setInProgress] = useState();
    const [isValid, setIsValid] = useState(false);

    app.ensure([entity]);

    useEffect(() => {
        console.log(fields);
        for (let i = 0; i < fields.length; i++) {
            if (!fields[i].isValid) {
                setIsValid(false);
                return;
            }
        }
        setIsValid(true);
    }, [fields]);

    useEffect(() => {
        var firstField = document.querySelector('#dialogForm .field:first-child input');
        if (firstField && firstField.focus) {
            firstField.focus();
        }
    }, [])

    const handleSubmit = (event) => {
        app.emit(app.formSubmissionEvent);
        if (!isValid) {
            event.preventDefault();
            return;
        }
        var data = {};
        new URLSearchParams(window.location.search).forEach((value, key) => data[key] = value);
        for (let i = 0; i < fields.length; i++) {
            data[fields[i].id.split('_')[1]] = fields[i].value;
        }
        console.log(data);
        setInProgress(true);
        let url = `${entity}/create`;
        post(url, data).then(data => {
            setIsDialogFormOpen(false);
            app.emit(app.itemCreated);
            setInProgress(false);
        }, error => {
            app.error(error);
            setInProgress(false);
        })
        event.preventDefault();
    }
    return <FormContext.Provider value={{ fields, setFields }}>
        <Page
            title={title}
            className="px-6 md:px-12 lg:w-2/3 mx-auto mt-24"
        >
            {
                explanations
            }
            {
                explanations
                    ?
                    <div className="mb-12"></div>
                    :
                    null
            }
            <form
                noValidate
                onSubmit={handleSubmit}
            >
                <div id='fields'>
                    {inputs}
                </div>
            </form>
            <div id='actions' className='mt-4'>
                {
                    actions ||
                    <div className="mr-6 mb-6" >
                        {
                            progress
                                ?
                                <CircularProgress size={30} />
                                :
                                <>
                                    <Button
                                        tabIndex={-1}
                                        className="text-gray-900 border-gray-400 "
                                        variant="outlined"
                                        onClick={() => setIsDialogFormOpen(false)}
                                    >
                                        {app.t('Cancel')}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        className={'ml-2' + (isValid ? " bg-green-200 text-gray-900 border-gray-400 " : "")}
                                        onClick={handleSubmit}
                                        disabled={!isValid}
                                    >
                                        {app.t('Save')}
                                    </Button>
                                </>
                        }
                    </div>
                }
            </div>
        </Page>
    </FormContext.Provider >
}

export { Form }