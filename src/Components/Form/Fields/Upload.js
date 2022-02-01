import React, { useState, useEffect, useCallback } from 'react'
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDropzone } from 'react-dropzone'
import { app, Field } from '@Form';
import { fieldStyles } from './FieldStyle'

const Upload = ({
    multiple
}) => {
    const [files, setFiles] = useState([])
    const [previews, setPreviews] = useState([])
    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    useEffect(() => {
        console.log(files)
        setPreviews(files.map(file => {
            return {
                name: file.name,
                url: URL.createObjectURL(file)
            }
        }))
        return () => previews.map(preview => URL.revokeObjectURL(preview.url))
    }, [files])

    useEffect(() => {
        console.log(previews)
    }, [previews])

    const removeImage = (preview) => {
        setFiles(files.filter(i => i.name != preview.name))
    }

    return <div
        className={fieldStyles + (previews.length === 0 ? " relative bg-slate-100 flex justify-center items-center py-20 cursor-pointer group hover:bg-slate-200 border-dashed border-2 border-slate-400 hover:border-slate-600 " : "")}
        {...getRootProps()}
    >
        {
            previews.length > 0
                ?
                <div className="relative flex items-center justify-around">
                    {
                        previews.map(preview => <div className="relative">
                            <img
                                className="rounded-lg shadow-md shadow-black w-20 h-20 object-cover "
                                src={preview.url}
                            />
                            <IconButton
                                className="absolute -top-4 -right-4 "
                                aria-label="delete"
                                onClick={() => removeImage(preview)}
                            >
                                <CancelIcon />
                            </IconButton>
                        </div>)
                    }
                </div>
                :
                <div>
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
    </div>
}

export { Upload }