import React, { useState, useEffect, useContext } from 'react';
import { post } from '../../Base/Api';
import { ListContext } from '../List/List';
import app from '../../Base/App';

export const FormContext = React.createContext();

const Form = ({
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
  const [isValid, setIsValid] = useState(false);
  const [isEdition, setIsEdition] = useState(false);

  app.ensure([entity]);

  title = title || `${isEdition ? 'Edit' : 'Create'} ${entity}`

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
    setFields
  }}>
    {children}
  </FormContext.Provider >
}

export { Form };
export { Text } from './Fields/Text';
export { Email } from './Fields/Email';
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