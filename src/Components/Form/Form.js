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

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  const handleSubmit = (event) => {
    Holism.emit(Holism.formSubmissionEvent);
    for (let i = 0; i < fields.length; i++) {
      if (!fields[i].isValid) {
        event.preventDefault();
        return;
      }
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
      console.error(error);
      setInProgress(false);
    })
    event.preventDefault();
  }
  return <FormContext.Provider value={{ fields, setFields }}>
    <Dialog
      open={isCreationDialogOpen}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth='md'
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
                    <Button variant="outlined" onClick={() => setIsCreationDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="outlined" className='bg-green-200 ml-2' onClick={handleSubmit}>
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
export { Enum } from './Fields/Enum';
export { LongText } from './Fields/LongText';