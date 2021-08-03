import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const ascending = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
</svg>

const descending = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
</svg>

const close = <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
</svg>

const Sorting = ({ sorts }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentSort, setCurrentSort] = useState({});

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (sort) => {
        if (sort) {
            setCurrentSort(sort);
        }
        setAnchorEl(null);
    };

    const resetSort = () => {
        setCurrentSort({});
    }

    return <>
        <div id='sorting' className='m-2 p-2 flex items-center cursor-pointer text-gray-700 
        hover:text-blue-500'>
            <div id='currentSort' className="mr-2 uppercase text-xs text-gray-500 font-light tracking-wider flex items-center">
                {currentSort.caption
                    ?
                    <span onClick={resetSort}>{close}</span>
                    :
                    null
                }
                {currentSort.caption}
            </div>
            <div className="flex items-center" onClick={handleClick} aria-controls='sortsMenu'>
                {ascending}
                {descending}
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
                sorts.map(sort => <MenuItem key={sort.caption} onClick={() => handleClose(sort)}>{sort.caption}</MenuItem>)
            }
        </Menu>
    </>
};

export default Sorting;