import React, { useState, useEffect, useContext } from 'react';
import Holism from '../../Base/Holism';
import { post } from '../../Base/Api';
import { ListContext } from '../List/List';

export const FormContext = React.createContext();

const defaultActions =
  <>
  </>

const Form = ({ inputs, actions, entity }) => {
  const { OpenModal, setOpenModal } = useContext(ListContext);
  // is edit, or is create? get id from somewhere
  // file upload
  // if is edit, load entity (only if they don't provide their own get method)
  // save
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  const handleSubmit = (event) => {
    debugger;
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
    setLoading(true);
    post(`${entity}/create`, data).then(data => {
      alert('hi');
      setLoading(false);
    }, error => {
      console.error(error);
      setLoading(false);
    })
    event.preventDefault();
  }
  return <FormContext.Provider value={{ fields, setFields }}>
    <form
      noValidate
      onSubmit={handleSubmit}
    >
      <div>
        <div>
          <div>
            <div>
              <div>Modal title</div>
              <button type="button" onClick={() => { setOpenModal(false) }}>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div>
              {inputs}
            </div>
            <div>
              {
                actions || <>
                  <button type="submit">
                    <i></i>  <span>Save</span>
                  </button>
                  <button type="button"
                    onClick={() => { setOpenModal(false) }}>
                    <i></i>  <span>Cancel</span>
                  </button></>
              }
            </div>
          </div>
        </div>
      </div>
    </form>
  </FormContext.Provider>
}

export { Form };
export { Text } from './Fields/Text';
export { Enum } from './Fields/Enum';
export { LongText } from './Fields/LongText';