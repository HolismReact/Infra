import React, { useState, useEffect, useContext } from 'react';
import { post } from '../../Base/Api';
import { ListContext } from '../List/List';
import app from '../../Base/App';

export const FormContext = React.createContext();

const FormBase = ({
  entity,
  title,
  explanations,
  inputs,
  actions,
  large,
  children
}) => {
  // is edit, or is create? get id from somewhere
  // file upload
  // if is edit, load entity (only if they don't provide their own get method)
  // save
  const [fields, setFields] = useState([]);
  const [progress, setInProgress] = useState();
  const [valid, setValid] = useState(false);
  const [isEdition, setIsEdition] = useState(false);

  app.ensure([entity]);

  title = title || `${isEdition ? 'Edit' : 'Create'} ${entity}`

  const isValid = () => {
    for (let i = 0; i < fields.length; i++) {
      if (!fields[i].isValid) {
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    isValid() ? setValid(true) : setValid(false);
  }, [fields]);

  const handleSubmit = (event) => {
    app.emit(app.formSubmissionEvent);
    if (!valid) {
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
      app.emit(app.itemCreated);
      setInProgress(false);
    }, error => {
      app.error(error);
      setInProgress(false);
    })
    event.preventDefault();
  }
  return <FormContext.Provider value={{
    fields,
    setFields,
    isValid
  }}>
    {children}
  </FormContext.Provider >
}

export { FormBase };