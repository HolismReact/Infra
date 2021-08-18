import Holism from "../../Base/Holism";
import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TextField from '@material-ui/core/TextField';
import { ListContext } from "./List";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PositiveInteger from "../Inputs/PositiveInteger";
import Integer from "../Inputs/Integer";

const textStyle = "text-blue-900 p-2 font-light text-xs items-center cursor-pointer uppercase hover:bg-blue-50 rounded-lg";

const Pagination = ({ metadata }) => {

    const { from, to, pageNumber, pageSize, pagesCount, hasMore, hasData, totalCount } = metadata;
    const [pageNumberDialogIsOpen, setPageNumberDialogVisibility] = useState(false);

    const { listParameters } = useContext(ListContext);

    const goToPage = (number) => {
        listParameters.pageNumber = number;
        Holism.emit(Holism.reloadRequirement);
    };

    return <div id='pagination' className="flex justify-between items-center">
        <Dialog
            open={pageNumberDialogIsOpen}
            aria-labelledby="dialog-title"
            TransitionProps={{ onEntered: () => { document.querySelector('#goToPageInput').focus() } }}
        >
            <DialogTitle id="dialog-title">Go to page</DialogTitle>
            <DialogContent>
                <form
                    noValidate
                    onSubmit={() => { }}
                >
                    <div id='fields'>
                        <PositiveInteger onEnter={(value) => {
                            if (value) {
                                goToPage(value)
                            }
                        }} />
                    </div>
                </form>
            </DialogContent>
            <DialogActions>
                <div id='actions' className='mt-4'>
                    <Button variant="outlined" onClick={() => setPageNumberDialogVisibility(false)}>
                        Cancel
                    </Button>
                    <Button variant="outlined" className='bg-green-200 ml-2' onClick={() => { }}>
                        Save
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
        <Button id='goToPage' className={textStyle + " text-left"} onClick={() => setPageNumberDialogVisibility(true)}>
            {/* <TextField
                label="Page"
                variant="outlined"
                size="small"
                className="w-24"
                InputLabelProps={{ className: "text-sm" }}
            />
            <Button className="ml-2" variant="outlined">Go</Button> */}
            Page #
        </Button>
        <div id='pageLinks' className="flex-1 items-center flex justify-center">
            <IconButton disabled={pageNumber === 1} onClick={() => goToPage(1)}><FirstPageIcon /></IconButton>
            <IconButton disabled={pageNumber === 1} onClick={() => goToPage(pageNumber - 1)}><ChevronLeftIcon /></IconButton>
            <span className="mx-4">{pageNumber}</span>
            <IconButton disabled={pageNumber >= pagesCount} onClick={() => goToPage(pageNumber + 1)}><ChevronRightIcon /></IconButton>
            <Tooltip title={pagesCount || ""}>
                <span>
                    <IconButton disabled={pageNumber >= pagesCount} onClick={() => goToPage(pagesCount)}><LastPageIcon /></IconButton>
                </span>
            </Tooltip>
        </div>
        <Button id='statsAndPageSize' className={textStyle + " text-right"}>
            {
                from
                    ?
                    <>
                        <span className="text-blue-900">{from}</span>
                        <span className="mx-2">-</span>
                        <span className="text-blue-900">{to}</span>
                    </>
                    :
                    null
            }
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