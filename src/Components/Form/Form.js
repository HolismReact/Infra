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
    entityType,
    title,
    explanations,
    inputs,
    actions,
    large
}) => {
    return <FormBase
        entityType={entityType}
        renderForm={({
            title,
            focusFirstInput,
            handleSubmit,
        }) => {
            return <Page
                title={title}
                className={"px-6 md:px-12 mx-auto mt-24 " + (large ? "lg:w-full" : "lg:w-2/3")}
            >
                <Explanations explanations={explanations} />
                <FormElement
                    id='form'
                    inputs={inputs}
                    handleSubmit={handleSubmit}
                />
                <Actions
                    actions={actions}
                    handleSubmit={handleSubmit}
                />
            </Page>
        }}
    />
}

export { Form }