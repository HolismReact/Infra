import React, { useState, useEffect, useContext } from 'react';
import { post } from '../../Base/Api';
import { ListContext } from '../List/List';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import app from '../../Base/App';

export const FormContext = React.createContext();

const Form = ({ entity, title, explanations, inputs, actions, small }) => {
  // is edit, or is create? get id from somewhere
  // file upload
  // if is edit, load entity (only if they don't provide their own get method)
  // save
  const { isCreationDialogOpen, setIsCreationDialogOpen } = useContext(ListContext);
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
      setIsCreationDialogOpen(false);
      app.emit(app.itemCreated);
      setInProgress(false);
    }, error => {
      app.error(error);
      setInProgress(false);
    })
    event.preventDefault();
  }
  return <FormContext.Provider value={{ fields, setFields }}>
    <Dialog
      /*dir={app.isRtl() ? "rtl" : "ltr"}*/
      open={isCreationDialogOpen}
      id='dialogForm'
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth={small ? 'sm' : 'md'}
      TransitionProps={{
        onEntered: () => {
          var firstField = document.querySelector('#dialogForm .field:first-child input');
          if (firstField && firstField.focus) {
            firstField.focus();
          }
        }
      }}
    >
      <DialogTitle id="form-dialog-title">{app.t(title)}</DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
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
                      onClick={() => setIsCreationDialogOpen(false)}
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
      </DialogActions>
    </Dialog>
  </FormContext.Provider >
}

export { Form };
export { Text } from './Fields/Text';
export { Select } from './Fields/Select';
export { Hidden } from './Fields/Hidden';
export { Enum } from './Fields/Enum';
export { LongText } from './Fields/LongText';
export { Browse } from './Fields/Browse';
export { DateOnly as Date } from './Fields/DateOnly';
export { Time } from './Fields/Time';
export { DateTime } from './Fields/DateTime';
export { Lookup } from './Fields/Lookup';
export { get, post } from '../../Base/Api';
export { app } from '../../Base/App';
export { useQueryStringState } from '../../Base/UseQueryStringState';
export { useLocalStorageState } from '../../Base/UseLocalStorageState';