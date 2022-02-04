import { useState, useEffect } from 'react'
import { Page, app, get } from '@Panel'

const Tree = ({
    title,
    entityType
}) => {

    const [progress, setProgress] = useState(false)
    const [entities, setEntities] = useState([])

    useEffect(() => {
        setProgress(true)
        get(`/${entityType}/tree`)
            .then(data => {
                setProgress(false)
                setEntities(data)
            }, error => {
                setProgress(false)
                app.error(error)
            })
    }, [])

    return <Page
        title={title}
        className="px-6"
    >
        tree
    </Page>
}

export { Tree }