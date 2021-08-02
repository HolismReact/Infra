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

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  const handleSubmit = (event) => {
    Holism.emit(Holism.formSubmissionEvent);
    for (var i = 0; i < fields.length; i++) {
      if (!fields[i].isValid) {
        event.preventDefault();
        return;
      }
    }
    // real submit;
    event.preventDefault();
  }

  return <FormContext.Provider value={{ fields, setFields }}>
    <form
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="card m-6 rounded-2xl p-4">
        <div className="card-header">
          <h6 className="card-title"> title </h6>
          <ul className="list-inline card-tools">
            <li className="list-inline-item mb-0">
              <button type="submit" className="btn btn-outline-success btn-uppercase">
                <i className="fa fa-save"></i> <span className="hidden md:block" >Create</span>
              </button>
            </li>
            <li>
              <button type="button" className="btn btn-outline-secondary btn-uppercase">
                <i className="fa fa-plus"></i>  <span className="hidden md:block">Cancel</span>
              </button>
            </li>
          </ul>
        </div>
        <div className="card-body">
          {prop.fields}
          {
            prop.actions || defaultActions
          }
        </div>
      </div>
    </form>
  </FormContext.Provider>
}

export { Form };
export { Text } from './Fields/Text';
export { EnumField } from './Fields/EnumField';
export { LongText } from './Fields/LongText';