import React, { useState, useEffect } from 'react';
import { app, get, post, upload } from '@Form';

export const FormContext = React.createContext();

const FormBase = ({
  entityType,
  entity,
  humanReadableEntityType,
  title,
  explanations,
  inputs,
  actions,
  large,
  renderForm,
  okAction,
}) => {
  // is edit, or is create? get id from somewhere
  // file upload
  // if is edit, load entity (only if they don't provide their own get method)
  // save
  const [fields, setFields] = useState([]);
  const [progress, setProgress] = useState();
  const [isValid, setIsValid] = useState(false);
  const [currentEntity, setCurrentEntity] = useState(entity);
  const [mode, setMode] = useState(app.formMode.creation)
  const [calculatedTitle, setCalculatedTitle] = useState('')
  const [hasFile, setHasFile] = useState(false)

  app.ensure([entityType]);

  useEffect(() => {
    console.log('has file? ', hasFile)
  }, [hasFile])

  useEffect(() => {
    // app.updateToken();
  }, [])

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
    if (!firstField) {
      firstField = document.querySelector(`#${formId} .field:first-child textarea`);
    }
    if (firstField && firstField.focus) {
      firstField.focus();
    }
  };

  useEffect(() => {
    if (currentEntity && currentEntity.id) {
      setMode(app.formMode.edition)
      // setFields(currentEntity)
    }
    else {
      setMode(app.formMode.creation)
    }
  }, [currentEntity])

  useEffect(() => {
    if (typeof title === 'string') {
      setCalculatedTitle(title)
    }
    else if (typeof title === 'function') {
      setCalculatedTitle(title(mode))
    }
    else {
      setCalculatedTitle(`${mode === app.formMode.edition ? 'Edit' : 'Create'} ${humanReadableEntityType || entityType}`)
    }
  }, [mode])

  useEffect(() => {
    const onFormCanceled = (item) => {
      resetForm()
    }
    app.on(app.formCanceled, onFormCanceled)
    return () => app.removeListener(app.formCanceled, onFormCanceled)
  }, [])

  const resetForm = () => {
    setFields([])
    setCurrentEntity(null)
  }

  useEffect(() => {
    app.on(app.creationRequested, resetForm)
    app.on(app.itemActionDialogRequested, resetForm)
    return () => {
      app.removeListener(app.creationRequested, resetForm)
      app.removeListener(app.itemActionDialogRequested, resetForm)
    }
  }, [])

  useEffect(() => {
    const onEditRequested = (params) => {
      if (entityType === params.entityType) {
        if (params.entity) {
          setCurrentEntity(params.entity);
        }
        if (params.entityId) {
          setProgress(true)
          get(`/${entityType}/get/${params.entityId}`)
            .then(data => {
              setProgress(false)
              setCurrentEntity(data)
            }, error => {
              setProgress(false)
              app.error(error)
            })
        }
      }
    }
    app.on(app.editRequested, onEditRequested);
    return () => {
      app.removeListener(app.editRequested, onEditRequested);
    }
  }, [entityType])

  useEffect(() => {
    validate()
    app.setFieldsCache(fields);
    app.updateToken()
  }, [validate, fields]);

  const handleSubmit = (event) => {
    app.emit(app.formSubmitted);
    if (!isValid) {
      event.preventDefault();
      return;
    }
    var data = hasFile ? new FormData() : {};
    if (hasFile) {
      app.selectedFiles.forEach(file => {
        data.append('file', file);
      });
    }
    new URLSearchParams(window.location.search).forEach((value, key) => data[key] = value);
    for (let i = 0; i < fields.length; i++) {
      const key = fields[i].id.split('_')[1];
      const value = fields[i].value;
      if (hasFile) {
        data.append(key, value);
      }
      else {
        data[key] = fields[i].value;
      }
    }
    console.log(data);
    if (okAction && typeof okAction === 'function') {
      okAction({ setProgress, data, currentEntity });
    }
    else {
      setProgress(true);
      // setTimeout(() => {
      //   setProgress(false)
      // }, 4000)
      let url = `${entityType}/`;
      if (hasFile) {
        url += 'upload'
      } else {
        url += `${mode === app.formMode.creation ? 'create' : 'update'}`
      }
      if (window.location.search) {
        const query = window.location.search.slice(1);
        if (url.indexOf('?') > -1) {
          url += '&';
        }
        else {
          url += '?'
        }
        url += query
      }
      if (mode === app.formMode.edition) {
        data['id'] = currentEntity.id;
      }
      const method = hasFile ? upload : post
      method(url, data).then(data => {
        app.emit(app.itemUpserted);
        app.success(`Item ${(app.formMode.creation ? 'created' : 'updated')} successfully.`)
        setProgress(false);
      }, error => {
        app.error(error);
        setProgress(false);
      })
    }
    event.preventDefault();
  }
  return <FormContext.Provider value={{
    fields,
    setFields,
    isValid,
    progress,
    currentEntity,
    mode,
    setHasFile
  }}>
    {
      renderForm({
        calculatedTitle,
        focusFirstInput,
        handleSubmit
      })
    }
  </FormContext.Provider >
}

export { FormBase };