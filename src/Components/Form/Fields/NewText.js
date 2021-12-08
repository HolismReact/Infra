import Input from '@mui/material/Input';
import app from '../../../Base/App';
import { useState, useEffect, useRef, useContext } from 'react';
import { FormContext } from '../Form';
import { fieldStyles } from './FieldStyle';
import { Field } from './Field';

const Text = ({ column, required, placeholder, hint, value, handleChange }) => {

    const htmlInput = useRef();

    const getValidationState = (currentValue) => {
        if (required && app.isNothing(currentValue)) {
            return 'invalid required';
        }
        return 'valid';
    }

    return <Field
        className={fieldStyles}
        type='text'
        validationStateProvider={getValidationState}
        column={column}
        placeholder={placeholder}
        hint={hint}
        value={value}
    >
        {
            ({ value, handleChange }) => {
                return <Input
                    inputRef={htmlInput}
                    required={required ? true : false}
                    onChange={handleChange}
                />
            }
        }
        {/* <Input
            inputRef={htmlInput}
            required={required ? true : false}
            onChange={handleChange}
        /> */}
    </Field>
};

export { Text }