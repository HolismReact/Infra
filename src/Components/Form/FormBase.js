import React, { useState, useEffect } from 'react';
import { app, post } from '@Form';

export const FormContext = React.createContext();

const FormBase = ({
  entityType,
  title,
  explanations,
  inputs,
  actions,
  large,
  renderForm
}) => {
  // is edit, or is create? get id from somewhere
  // file upload
  // if is edit, load entity (only if they don't provide their own get method)
  // save
  const [fields, setFields] = useState([]);
  const [progress, setProgress] = useState();
  const [isValid, setIsValid] = useState(false);
  const [entity, setEntity] = useState(null);
  const [mode, setMode] = useState(app.formMode.creation)

  app.ensure([entityType]);

  title = title || `${mode == app.formMode.edition ? 'Edit' : 'Create'} ${entityType}`

  const validate = () => {
    for (let i = 0; i < fields.length; i++) {
      if (!fields[i].isValid) {
        setIsValid(false);
        return;
      }
    }
    setIsValid(true);
  }

  const focusFirstInput = (formId) => {
    var firstField = document.querySelector(`#${formId} .field:first-child input`);
    if (firstField && firstField.focus) {
      firstField.focus();
    }
  };

  useEffect(() => {
    if (entity && entity.id) {
      setMode(app.formMode.edition)
    }
    else {
      setMode(app.formMode.creation)
    }
  }, [entity])

  useEffect(() => {
    const onEditRequested = (params) => {
      if (entityType == params.entityType) {
        setEntity(params.entity);
      }
    }
    app.on(app.editRequested, onEditRequested);
    return () => {
      app.removeListener(app.editRequested, onEditRequested);
    }
  }, [])

  useEffect(() => {
    validate()
    app.setFieldsCache(fields);
  }, [fields]);

  const handleSubmit = (event) => {
    app.emit(app.formSubmitted);
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
    setProgress(true);
    // setTimeout(() => {
    //   setProgress(false)
    // }, 4000)
    let url = `${entityType}/${mode === app.formMode.creation ? 'create' : 'update'}`;
    if (mode === app.formMode.edition) {
      data['id'] = entity.id;
    }
    post(url, data).then(data => {
      app.emit(app.itemCreated);
      setProgress(false);
    }, error => {
      app.error(error);
      setProgress(false);
    })
    event.preventDefault();
  }
  return <FormContext.Provider value={{
    fields,
    setFields,
    isValid,
    progress,
    entity,
    mode
  }}>
    {
      renderForm({
        title,
        focusFirstInput,
        handleSubmit
      })
    }
  </FormContext.Provider >
}

export { FormBase };