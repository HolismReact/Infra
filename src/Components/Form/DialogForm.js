import Dialog from '../Dialog/Dialog'

const DialogForm = ({ title, entity, inputs, actions, small }) => {
    return <Dialog
        title={title}
        content={inputs}
    >
        <DialogContent>
            {form}
        </DialogContent>
        <DialogActions>
            <div id='actions' className='mt-4'>
                {
                    actions ||
                    <div className="mr-6 mb-6" >
                        {
                            progress
                                ?
                                <CircularProgress size={30} />
                                :
                                <>
                                    <Button
                                        tabIndex="-1"
                                        variant="outlined"
                                        onClick={() => setIsCreationDialogOpen(false)}
                                    >
                                        {app.t('Cancel')}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        className={'ml-2' + (isValid ? " bg-green-200" : "")}
                                        onClick={handleSubmit}
                                        disabled={!isValid}
                                    >
                                        {app.t('Save')}
                                    </Button>
                                </>
                        }
                    </div>
                }
            </div>
        </DialogActions>
    </Dialog>
}

export default DialogForm;