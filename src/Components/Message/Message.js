import { useState } from 'react'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Collapse from '@mui/material/Collapse'
import Button from '@mui/material/Button'

const Message = ({
    severity,
    title,
    text,
    close,
    action,
    className
}) => {

    const [isOpen, setIsOpen] = useState(true)

    return <Collapse
        in={isOpen}
        className={className}
    >
        <Alert
            severity={severity}
            action={<Button
                className="text-slate-800"
            >{action}</Button>}
            onClose={close ? () => setIsOpen(false) : null}
            className=""
        >
            {title && <AlertTitle>{title}</AlertTitle>}
            {text}
        </Alert>
    </Collapse>
}

export default Message
export { Message }