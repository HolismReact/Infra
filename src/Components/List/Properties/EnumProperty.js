import { useState, useEffect } from 'react'
import Collapse from '@mui/material/Collapse';
import { Chip } from "./Chip"
import { DialogForm, Progress, app, get, post } from '@Form'

const EnumProperty = ({
    column,
    enumeration,
    currentText,
    currentStyle,
    styleProvider,
    actionUrl
}) => {
    const [open, setOpen] = useState()
    const [progress, setProgress] = useState(false)
    const [enumItems, setEnumItems] = useState([])
    const [selectedEnum, setSelectedEnum] = useState({ key: currentText })

    const current =
        <Chip
            className={currentStyle + " select-none " + (actionUrl && " cursor-pointer hover:shadow-md hover:scale-105 transition-all")}
            text={currentText}
        />

    const inputs = <>
        {
            progress
                ?
                <Progress />
                :
                <>
                    {
                        enumItems.map(item => <div
                            key={item.id}
                            onClick={() => setSelectedEnum(item)}
                            className="mb-2"
                        >
                            <Chip
                                className={styleProvider(item.key) + " select-none transition-all cursor-pointer " + (item.id === selectedEnum.id && " shadow-lg scale-110 ")}
                                text={item.key}
                            />
                        </div>)
                    }
                    <Collapse
                        in={selectedEnum.key !== currentText}
                    >
                        <div
                            className="border-t mt-6 pt-6 flex justify-center"
                        >
                            {current}
                            <span className="mx-4
                        ">{'=>'}</span>
                            <Chip
                                className={styleProvider(selectedEnum.key) + " select-none transition-all "}
                                text={selectedEnum.key}
                            />
                        </div>
                    </Collapse>
                </>
        }
    </>

    const save = () => {
        setProgress(true)
        post(actionUrl + `?newEnumItem=${selectedEnum.id}`)
            .then(data => {
                setProgress(false)
                setOpen(false)
            }, error => {
                setProgress(false)
                app.error(error)
            })
    }

    useEffect(() => {
        if (!open) {
            return;
        }
        setProgress(true)
        get(`/${enumeration}/all`)
            .then(data => {
                setEnumItems(data)
                setProgress(false)
            }, error => {
                app.error(error)
                setProgress(false)
            })
    }, [open])

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
            {current}
        </span>
    </div>
}

export default EnumProperty
export { EnumProperty }