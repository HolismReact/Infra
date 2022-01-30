import { useState, useEffect } from 'react'
import { Progress, app, get, FormContext, fieldStyles } from '@Form';

const Checks = ({
    column,
    itemsUrl,
    checkedItemsUrl,
    show,
    choose,
    setLoader
}) => {
    const [items, setItems] = useState(null)
    const [checkedItems, setCheckedItems] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoader(load)
    }, [])

    const load = () => {
        loadItems()
        loadCheckedItems()
    }

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
                    throw new Error('Return value of the API is not well formatted')
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
                        setCheckedItems(data)
                    }
                    throw new Error('Return value of the API is not well formatted')
                }
            }, error => {
                setLoading(false)
                app.error(error)
            })
    }

    useEffect(() => {
        if (items && items.length && checkedItems && checkedItems.length) {
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
                            items.map(item => <div>{show(item)}</div>)
                            :
                            <div>{app.t('No item is found')}</div>
                    }
                </div>
        }
    </div>
}

export { Checks }