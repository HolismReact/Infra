import Holism from "../../Base/Holism";
import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TextField from '@material-ui/core/TextField';

const textStyle = "text-blue-900 p-2 font-light text-xs items-center cursor-pointer uppercase hover:bg-blue-50 rounded-lg";

const Pagination = ({ metadata }) => {

    const { from, to, pageNumber, pageSize, pagesCount, hasMore, hasData, totalCount } = metadata;

    const goToPage = (number) => {

    };

    return <div id='pagination' className="flex justify-between items-center">
        <Button id='goToPage' className={textStyle + " text-left"}>
            {/* <TextField
                label="Page"
                variant="outlined"
                size="small"
                className="w-24"
                InputLabelProps={{ className: "text-sm" }}
            />
            <Button className="ml-2" variant="outlined">Go</Button> */}
            GO TO PAGE
        </Button>
        <div id='pageLinks' className="flex-1">
            <IconButton disabled={pageNumber === 1} onClick={goToPage(1)}><FirstPageIcon /></IconButton>
            <IconButton disabled={pageNumber === 1} onClick={goToPage(pageNumber - 1)}><ChevronLeftIcon /></IconButton>
            <span className="mx-4">{pageNumber}</span>
            <IconButton disabled={pageNumber >= pagesCount} onClick={goToPage(pageNumber + 1)}><ChevronRightIcon /></IconButton>
            <Tooltip title={pagesCount}>
                <IconButton disabled={pageNumber >= pagesCount} onClick={goToPage(pagesCount)}><LastPageIcon /></IconButton>
            </Tooltip>
        </div>
        <Button id='statsAndPageSize' className={textStyle + " text-right"}>
            <span className="text-blue-900">{from}</span>
            <span className="mx-2">-</span>
            <span className="text-blue-900">{to}</span>
            {
                totalCount
                    ?
                    <>
                        <span className="mx-2">/</span>
                        <span className="text-blue-900">{totalCount}</span>
                    </>
                    :
                    null
            }
        </Button>
    </div>
}

export default Pagination;