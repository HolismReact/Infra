import React, { useState } from 'react';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { Dialog, ItemAction } from '@List';
import { app } from '@List';

const ViewRecordAction = ({
    entityType,
    item,
    asMenuItem
}) => {

    const [open, setOpen] = useState(false)

    const getJsonHtml = (obj) => {
        if (!obj) {
            return <span></span>
        }
        return <ul>
            {
                Object.getOwnPropertyNames(obj).map(propertyName => {
                    const property = obj[propertyName]
                    return <li>
                        <span className="font-bold px-2 py-1 bg-gray-500 text-gray-100 mb-1 inline-block rounded">{propertyName}</span>
                        {
                            typeof property === 'object'
                                ?
                                <span className="ml-6 block">
                                    {getJsonHtml(property)}
                                </span>
                                :
                                <span className="inline-block ml-1">
                                    {obj[propertyName]}
                                </span>
                        }
                    </li>
                })
            }
        </ul>
    }

    const dialog = <Dialog
        title='View record'
        content={getJsonHtml(item)}
        isOpen={open}
        onClosed={() => setOpen(false)}
    />

    return <>
        {dialog}
        <ItemAction
            icon={<DataObjectIcon style={{ color: 'rgb(37 99 235)' }} />}
            asMenuItem={asMenuItem}
            title={app.t("View record")}
            click={() => setOpen(!open)}
        />
    </>
}

export default ViewRecordAction;