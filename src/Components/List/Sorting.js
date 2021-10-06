import React, { useState, useEffect, useContext } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SortIcon from '@material-ui/icons/Sort';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import CloseIcon from '@material-ui/icons/Close';
import { ListContext } from './List';
import app from '../../Base/App';

const Sorting = ({ sorts }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [currentSort, setCurrentSort] = useState({});
    const { listParameters } = useContext(ListContext);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (sort) => {
        if (sort) {
            if (sort.caption) {
                setCurrentSort(sort);
            }
        }
        setAnchorEl(null);
    };

    const resetSort = () => {
        setCurrentSort({});
    }

    useEffect(() => {
        listParameters.sorts = [currentSort];
        app.emit(app.reloadRequirement);
    }, [currentSort]);

    return <>
        <div id='sorting' className='mr-4 flex items-center cursor-pointer text-gray-700 
        hover:text-blue-500'>
            <div id='currentSort' className="mr-2 uppercase text-xs text-gray-500 font-light tracking-wider flex items-center">
                {currentSort.caption
                    ?
                    <span onClick={resetSort}><CloseIcon /></span>
                    :
                    null
                }
                {currentSort.caption}
            </div>
            <div className="flex items-center" onClick={handleClick} aria-controls='sortsMenu'>
                <ImportExportIcon />
            </div>
        </div>
        <Menu
            id="sortsMenu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
            {
                sorts.map(sort => <MenuItem
                    key={sort.caption}
                    onClick={(event) => {
                        handleClose(sort);
                        event.preventDefault();
                    }}
                >
                    {sort.caption}
                </MenuItem>)
            }
        </Menu>
    </>
};

export default Sorting;