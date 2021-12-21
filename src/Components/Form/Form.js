import React from 'react';
import {
    FormBase,
    Page,
    Explanations,
    FormElement,
    Actions,
} from '@Form';

export const FormContext = React.createContext();

const Form = ({
    entity,
    title,
    explanations,
    inputs,
    actions,
    large
}) => {
    return <FormBase
        entity={entity}
    >
        <Page
            title={title}
            className="px-6 md:px-12 lg:w-2/3 mx-auto mt-24"
        >
            <Explanations explanations={explanations} />
            <FormElement inputs={inputs} />
            <Actions
                actions={actions}
            />
        </Page>
    </FormBase>
}

export { Form }