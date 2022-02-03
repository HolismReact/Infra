import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import {
    FormBase,
    Page,
    Explanations,
    FormElement,
    Actions,
    app
} from '@Form';

export const FormContext = React.createContext();

const Form = ({
    entityType,
    entity,
    title,
    explanations,
    inputs,
    actions,
    large
}) => {

    const navigate = useNavigate();
    const { entityId } = app.parseQuery()

    useEffect(() => {
        if (entityId) {
            app.emit(app.editRequested, { entityId })
        }
    }, [])

    useEffect(() => {
        const onFormCanceled = (item) => {
            navigate(-1)
        }
        app.on(app.formCanceled, onFormCanceled)
        return () => app.removeListener(app.formCanceled, onFormCanceled)
    }, [])

    return <FormBase
        entityType={entityType}
        entity={entity}
        renderForm={({
            calculatedTitle,
            focusFirstInput,
            handleSubmit,
        }) => {
            return <Page
                title={calculatedTitle}
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