import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { app, Field } from '@Form';
import { fieldStyles } from './FieldStyle'

const Upload = ({

}) => {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return <div
        className={fieldStyles + " bg-slate-100 flex justify-center items-center py-20 cursor-pointer group hover:bg-slate-200 border-dashed border-2 border-slate-400 hover:border-slate-600"}
        {...getRootProps()}
    >
        <input {...getInputProps()} />
        <p className="text-sm tracking-wide font-bold text-slate-600 group-hover:drop-shadow group-hover:drop-shadow">
            {
                isDragActive ?
                    <span>Drop the files here ...</span> :
                    <span>Drag &amp; drop some files here, or click to select files</span>
            }
        </p>
    </div>
}

export { Upload }