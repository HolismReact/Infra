import { useState } from 'react'
import { Chip } from "./Chip"
import { DialogForm } from '@Form'

const EnumProperty = ({
    column,
    enumeration,
    currentText,
    currentStyle,
    styleProvider,
    actionUrl
}) => {
    const [open, setOpen] = useState()

    const inputs = <>
        <div>hi</div>
    </>

    const save = () => {

    }

    return <div>
        <DialogForm
            entityType='Enumeration'
            title='Set new value'
            inputs={inputs}
            isOpen={open}
            close={() => setOpen(false)}
            okAction={save}
        />
        <span
            onClick={() => setOpen(true)}
        >
            <Chip
                className={currentStyle + " select-none " + (actionUrl && " cursor-pointer hover:shadow-md hover:scale-105 transition-all")}
                text={currentText}
            />
        </span>
    </div>
}

export default EnumProperty
export { EnumProperty }