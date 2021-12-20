import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { app } from './Form';

const Actions = ({
    actions,
    className,
    progress,
    isValid,
    handleSubmit
}) => {
    return <div id='actions' className={'mt-4 ' + className}>
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
                                tabIndex={-1}
                                className="text-gray-900 border-gray-400 "
                                variant="outlined"
                                onClick={() => app.emit(app.dialogFormCanceled)}
                            >
                                {app.t('Cancel')}
                            </Button>
                            <Button
                                variant="outlined"
                                className={'ml-2' + (isValid ? " bg-green-200 text-gray-900 border-gray-400 " : "")}
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
}

export { Actions }