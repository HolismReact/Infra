import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { app, Field } from '@Form';
import { fieldStyles } from './FieldStyle'

const Upload = ({
    multiple
}) => {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return <div
        className={fieldStyles + " relative bg-slate-100 flex justify-center items-center py-20 cursor-pointer group hover:bg-slate-200 border-dashed border-2 border-slate-400 hover:border-slate-600 "}
        {...getRootProps()}
    >
        {
            isDragActive && <div className="absolute inset-0 bg-green-500 animate-pulse"></div>
        }
        <input {...getInputProps()} />
        <p className="relative text-sm tracking-wide font-bold text-slate-600 group-hover:drop-shadow group-hover:drop-shadow">
            {
                isDragActive ?
                    <span>Drop the {multiple ? "files" : "file"} here ...</span> :
                    <span>Drag &amp; drop {multiple ? "some files" : "a file"} here, or click to select {multiple ? "files" : "a file"}</span>
            }
        </p>
    </div>
}

export { Upload }