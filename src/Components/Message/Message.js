import { useState } from 'react'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Collapse from '@mui/material/Collapse'

const Message = ({
    severity,
    title,
    text,
    close,
    action
}) => {

    const [isOpen, setIsOpen] = useState(true)

    return <Collapse
        in={isOpen}
    >
        <Alert
            severity={severity}
            action={action}
            onClose={close ? () => setIsOpen(false) : null}
        >
            {title && <AlertTitle>{title}</AlertTitle>}
            {text}
        </Alert>
    </Collapse>
}

export default Message
export { Message }