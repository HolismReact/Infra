import Input from '@material-ui/core/Input';
import Holism from '../../../Base/Holism';
import { useState, useEffect, useRef, useContext } from 'react';
import { FormContext } from '../Form';
import { fieldStyles } from './FieldStyle';
import { Field } from './Field';

const Text = ({ column, required, placeholder, hint, value }) => {

    const htmlInput = useRef();

    const getValidationState = (currentValue) => {
        if (required && Holism.isNothing(currentValue)) {
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
        <Input
            inputRef={htmlInput}
            required={required ? true : false}
            onChange={(e) => setCurrentValue(e.target.value)}
        />
    </Field>
};

export { Text }