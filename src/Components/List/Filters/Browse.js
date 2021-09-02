import Holism from "../../../Base/Holism";
import Filter from "./Filter";
import Input from '@material-ui/core/Input';
import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Browse = ({ column, placeholder, entity, browser, valueDisplayer }) => {

    const [isBrowserDialogOpen, setIsBrowserDialogOpen] = useState(false);

    const clonedBrowser = React.cloneElement(browser(), {
        callerId: `${column}_browser`
    });

    useEffect(() => {
        const handleEntitySelection = ({ item, callerId }) => {
            if (callerId != id) {
                return;
            }
            setIsBrowserDialogOpen(false);
            setCurrentValue(valueDisplayer(item));
            if (column.endsWith('Guid')) {
                console.log(item, 'guid');
            }
            else if (column.endsWith('Id')) {
                console.log(item, 'id');
            }
        }
        Holism.on(Holism.entitySelected, handleEntitySelection);
        return () => {
            Holism.removeListener(Holism.entitySelected, handleEntitySelection);
        }
    });

    const browserDialog = <Dialog
        open={isBrowserDialogOpen}
        aria-labelledby="form-dialog-title"
        fullScreen
        TransitionComponent={Transition}
        onClose={() => setIsBrowserDialogOpen(false)}
    >
        <DialogTitle
            id="form-dialog-title"
            className="bg-gray-100"
        >
            <div className="flex items-center">
                <IconButton onClick={() => setIsBrowserDialogOpen(false)} aria-label="close">
                    <CloseIcon />
                </IconButton>
                <span className="ml-4">{"Find " + entity || ""}</span>
            </div>
        </DialogTitle>
        <DialogContent>
            {clonedBrowser}
        </DialogContent>
        <DialogActions>
            <div id='actions' className='mt-4'>
                {
                    <div className="mr-6 mb-6" >
                        <Button variant="outlined" onClick={() => setIsBrowserDialogOpen(false)}>
                            Cancel
                        </Button>
                    </div>
                }
            </div>
        </DialogActions>
    </Dialog>

    return <Filter
        type='text'
        column={column}
        placeholder={placeholder}
        renderInput={(value, onChange) => <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            // startAdornment={
            //     <InputAdornment position="start">
            //     </InputAdornment>
            // }
            endAdornment={
                <InputAdornment position="end">
                    <Tooltip title={"Find " + (entity || "")}>
                        <IconButton
                            aria-label={"Find " + entity}
                            onClick={() => setIsBrowserDialogOpen(true)}
                            onMouseDown={() => { }}
                        >
                            <MoreHorizIcon />
                        </IconButton>
                    </Tooltip>
                </InputAdornment>
            }
        />}
    />
}

export { Browse };