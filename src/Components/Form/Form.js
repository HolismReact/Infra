import React, { useState, useEffect, useContext } from 'react';
import Holism from '../../Base/Holism';
import { post } from '../../Base/Api';
import { ListContext } from '../List/List';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

export const FormContext = React.createContext();

const Form = ({ inputs, actions, entity, title }) => {
  // is edit, or is create? get id from somewhere
  // file upload
  // if is edit, load entity (only if they don't provide their own get method)
  // save
  const { isCreationDialogOpen, setIsCreationDialogOpen } = useContext(ListContext);
  const [fields, setFields] = useState([]);
  const [progress, setInProgress] = useState();
  const [isValid, setIsValid] = useState(false);

  Holism.ensure([entity]);

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
    Holism.emit(Holism.formSubmissionEvent);
    if (!isValid) {
      event.preventDefault();
      return;
    }
    var data = {};
    for (let i = 0; i < fields.length; i++) {
      data[fields[i].id.split('_')[1]] = fields[i].value;
    }
    console.log(data);
    setInProgress(true);
    post(`${entity}/create`, data).then(data => {
      setIsCreationDialogOpen(false);
      Holism.emit(Holism.itemCreated);
      setInProgress(false);
    }, error => {
      Holism.error(error);
      setInProgress(false);
    })
    event.preventDefault();
  }
  return <FormContext.Provider value={{ fields, setFields }}>
    <Dialog
      open={isCreationDialogOpen}
      id='dialogForm'
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth='md'
      TransitionProps={{
        onEntered: () => {
          var firstField = document.querySelector('#dialogForm .field:first-child input');
          if (firstField && firstField.focus) {
            firstField.focus();
          }
        }
      }}
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
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
                      tabIndex="-1"
                      variant="outlined"
                      onClick={() => setIsCreationDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="outlined"
                      className={'ml-2' + (isValid ? " bg-green-200" : "")}
                      onClick={handleSubmit}
                      disabled={!isValid}
                    >
                      Save
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
export { Hidden } from './Fields/Hidden';
export { Enum } from './Fields/Enum';
export { LongText } from './Fields/LongText';
export { Browse } from './Fields/Browse';
export { DateOnly as Date } from './Fields/Date';
export { Time } from './Fields/Time';
export { DateTime } from './Fields/DateTime';