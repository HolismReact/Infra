import Holism from "../../Base/Holism";
import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TextField from '@material-ui/core/TextField';

const textStyle = "text-blue-900 p-2 font-light text-xs items-center cursor-pointer uppercase hover:bg-blue-50 rounded-lg";

const Pagination = ({ metadata }) => {
    return <div id='pagination' className="flex justify-between items-center">
        <span id='goToPage' className={textStyle + " text-left"}>
            {/* <TextField
                label="Page"
                variant="outlined"
                size="small"
                className="w-24"
                InputLabelProps={{ className: "text-sm" }}
            />
            <Button className="ml-2" variant="outlined">Go</Button> */}
            Go to page
        </span>
        <div id='pageLinks' className="flex-1">
            <IconButton><FirstPageIcon /></IconButton>
            <IconButton><ChevronLeftIcon /></IconButton>
            <span className="mx-4">{metadata.pageNumber}</span>
            <IconButton><ChevronRightIcon /></IconButton>
            <IconButton><LastPageIcon /></IconButton>
        </div>
        <span id='statsAndPageSize' className={textStyle + " text-right"}>
            <span className="text-blue-900">7893</span>
            <span className="mx-2">-</span>
            <span className="text-blue-900">8939</span>
            <span className="mx-2">/</span>
            <span className="text-blue-900">29839293</span>
        </span>
    </div>
}

export default Pagination;