import { useState, useEffect } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Progress, app, get, FormContext, fieldStyles } from '@Form';

const Checks = ({
    column,
    itemsUrl,
    checkedItemsUrl,
    show,
    choose,
    itemKey
}) => {
    const [items, setItems] = useState(null)
    const [checkedItems, setCheckedItems] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const onRunMethod = (entityGuid) => {
            if (entityGuid === itemKey) {
                loadItems()
                loadCheckedItems()
            }
        }
        app.on(app.runMethod, onRunMethod)
        return () => {
            app.removeListener(app.runMethod, onRunMethod)
        }
    }, [])

    useEffect(() => {
        loadItems()
        loadCheckedItems()
    }, [])

    const loadItems = () => {
        setLoading(true)
        get(itemsUrl)
            .then(data => {
                if (Array.isArray(data)) {
                    setItems(data)
                }
                else {
                    if (data.data) {
                        setItems(data.data)
                    }
                    else {
                        throw new Error('Return value of the API is not well formatted')
                    }
                }
            }, error => {
                setLoading(false)
                app.error(error)
            })
    }

    const loadCheckedItems = () => {
        setLoading(true)
        get(checkedItemsUrl)
            .then(data => {
                if (Array.isArray(data)) {
                    setCheckedItems(data)
                }
                else {
                    if (data.data) {
                        setCheckedItems(data.data)
                    }
                    else {
                        throw new Error('Return value of the API is not well formatted')
                    }
                }
            }, error => {
                setLoading(false)
                app.error(error)
            })
    }

    useEffect(() => {
        if (items && items.map && checkedItems && checkedItems.map) {
            setLoading(false)
        }
    }, [items, checkedItems])

    return <div className={fieldStyles}>
        {
            loading
                ?
                <Progress />
                :
                <div>
                    {
                        items && items.length > 0
                            ?
                            <FormGroup>
                            {
                                items.map(item => <FormControlLabel 
                                    control={<Checkbox
                                        
                                    />}
                                    label={show(item)}
                                />)
                            }
                            </FormGroup>
                            :
                            <div>{app.t('No item is found')}</div>
                    }
                </div>
        }
    </div>
}

export { Checks }