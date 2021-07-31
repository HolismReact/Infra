import React, { useState } from 'react';
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

    const [fields, setFields] = useState([{ field: 'textbox1', state: 'invalid required', isValid: true, field: 'textbox2', state: '', isValid: true }]);
    const [data, setData] = useState({ name: 'saeed', age: 38 });

    Holism.eventEmitter.removeAllListeners('holism_form_submission_requested');

    const handleSubmit = (event) => {
        Holism.emit('holism_form_submission_requested');
        event.preventDefault();
    }

    return <div className="card">
    <div className="card-header">
      <h6 className="card-title"> title </h6>
      <ul className="list-inline card-tools">
        <li className="list-inline-item mb-0">
          <button type="button" class="btn btn-outline-success btn-uppercase">
            <i class="fa fa-save"></i> <span className="hidden md:block" >Create User </span>
          </button>
        </li>
        <li>
          <button type="button" class="btn btn-outline-secondary btn-uppercase">
            <i class="fa fa-plus"></i>  <span className="hidden md:block">Create User</span>
          </button>
        </li>
      </ul>
    </div>
    <div className="card-body">
      
    <FormContext.Provider value={{ fields: [fields, setFields], data: [data, setData] }}>
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
    </div>
  </div>   
    
}

export default Form;