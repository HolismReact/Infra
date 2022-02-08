import React, { useState, useEffect } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import CachedIcon from '@mui/icons-material/Cached';
import Tooltip from '@mui/material/Tooltip';
import useLocalStorageState from '../../Base/UseLocalStorageState';
import { Page, app, get } from '@Panel'
import Node from './Node'

const listActionIconStyle = "text-gray-700 hover:text-blue-500 cursor-pointer";

const Tree = ({
    title,
    entityType,
    filters,
    expanded,
    show,
    upsert
}) => {

    const [isFilteringOpen, setIsFilteringOpen] = useLocalStorageState(false, `${app.userGuid()}_${entityType}_isFilteringOpen`);
    const [progress, setProgress] = useState(false)
    const [entities, setEntities] = useState([])

    const toggleFiltering = () => {
        setIsFilteringOpen(!isFilteringOpen);
    }

    let url = `/${entityType}/tree`

    if (window.location.search) {
        const query = window.location.search.slice(1);
        url += `?${query}`;
    }

    const reload = () => {
        setProgress(true)
        get(url)
            .then(data => {
                setProgress(false)
                setEntities(data)
            }, error => {
                setProgress(false)
                app.error(error)
            })
    }

    useEffect(() => {
        reload()
    }, [])

    useEffect(() => {
        app.on(app.reloadRequested, reload)
        return () => app.removeListener(app.reloadRequested, reload)
    }, [])

    const showUpsert = () => {

    }

    return <div>
        <div
            className={
                "sortAndFilteringAndReload flex items-center justify-end my-4 lg:my-0"
                + (app.isRtl() ? " flex-row-reverse " : "")
            }
        >
            <div onClick={() => showUpsert()}>Create</div>
            {
                filters && (filters.props?.children?.length > 0 || filters.props?.children?.props)
                    ?
                    <span
                        id='showHideFiltering'
                        className={
                            listActionIconStyle
                            + (app.isRtl() ? " ml-2 " : " mr-2 ")
                        }
                        onClick={toggleFiltering}
                    >
                        <Tooltip title={app.t('Filters')}>
                            <FilterListIcon />
                        </Tooltip>
                        {/* <span>Filters</span> */}
                    </span>
                    :
                    null
            }
            {
                <span
                    id='reload'
                    onClick={() => app.emit(app.reloadRequested)}
                    className={listActionIconStyle}
                >
                    <Tooltip title={app.t('Reload')}>
                        <CachedIcon />
                    </Tooltip>
                </span>
            }
        </div>

        <Page
            title={title}
            className="px-6"
        >
            <ul>
                {
                    entities && entities.map(entity => <Node
                        key={entity.id}
                        entity={entity}
                        expanded={expanded || true}
                        show={show}
                    />)
                }
            </ul>
        </Page>
    </div>
}

export { Tree }