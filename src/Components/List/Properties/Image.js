import { useState } from 'react'
import UploadIcon from '@mui/icons-material/Upload';
import { Dialog, HolismIcon } from '../Exports';
import { FormElement, Upload, app, upload } from '@Form'
import { OkCancel } from '@Panel';

const Image = ({
    url,
    alt,
    uploadUrl
}) => {

    const [isOpen, setIsOpen] = useState(false)
    const [progress, setProgress] = useState(false)

    const uploadImage = () => {
        var form = new FormData();
        app.selectedFiles.forEach(file => {
            form.append('file', file);
        });
        setProgress(true)
        upload(uploadUrl, form)
            .then(data => {
                setProgress(false)
                app.success('Image uploaded successfully')
                setIsOpen(false)
                app.emit(app.entityReloadRequested, { entity: data })
            }, error => {
                setProgress(false)
                app.error(error)
            })
    }

    return <div className="relative">
        {
            uploadUrl &&
            <Dialog
                isOpen={isOpen}
                title='Upload image'
                content={<>
                    {/* <Explanations explanations={explanations} /> */}
                    <FormElement
                        id='uploadImageForm'
                        inputs={<>
                            <Upload
                            />
                        </>}
                    />
                </>}
                actions={
                    <OkCancel
                        progress={progress}
                        okClick={() => uploadImage()}
                        cancelClick={() => setIsOpen(false)}
                    />
                }
                onEntered={() => {
                    // focusFirstInput('uploadImageForm')
                }}
            />
        }
        <span className="group" onClick={() => setIsOpen(true)}>
            <img src={url} alt={alt || ''} className={"w-8 h-8 object-cover rounded-full " + (uploadUrl && "cursor-pointer group-hover:shadow-md group-hover:shadow-black transition-all")} />
            {
                uploadUrl &&
                <HolismIcon
                    icon={UploadIcon}
                    className="absolute bottom-0 left-6 w-4 h-4 cursor-pointer text-slate-900 bg-white  rounded-full p-0.5 group-hover:bg-slate-900 group-hover:text-white transition-colors"
                />
            }
        </span>
    </div>
}

export { Image }