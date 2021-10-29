import React from "react";

const defaultAccept = 'image/jpeg, image/png';

const defaultMaxSizeFile = 10674186; // bytes = 10Mb

const validFiles = (fileList: FileList, mediaTypeList = defaultAccept?.split(','), maxSize = defaultMaxSizeFile) => {
    let valid = true;
    for (let index = 0; index < fileList.length; index++) {
        const file = fileList.item(index);
        if (file && file?.size > maxSize) {
            valid = false;
            break;
        }
        if (file && !mediaTypeList.includes(file?.type)) {
            valid = false;
            break;
        }
    }
    return valid;
}

export interface UploadFiles {
    accept?: string;
    multiple?: boolean;
    required?: boolean;
    onClear?: React.FormEventHandler<HTMLFormElement>;
    onFiles?: (fileList: FileList) => void;
    onUpload?: (fileList: FileList, event?: React.FormEvent<HTMLFormElement>) => void;
}

const UploadFiles: React.FC<UploadFiles> = ({ multiple = true, onFiles, onClear, onUpload, accept = defaultAccept, required = true }) => {

    const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const inputFiles = (event.target as HTMLFormElement).elements.namedItem('files') as HTMLFormElement & { files?: FileList }
        inputFiles?.files && validFiles(inputFiles?.files) && onUpload && onUpload(inputFiles?.files, event);
    }

    const handleOnReset: React.FormEventHandler<HTMLFormElement> = (event) => {
        onClear && onClear(event);
    }

    const handleOnChange: React.ChangeEventHandler<HTMLInputElement & { files?: FileList }> = (event) => {
        if (!validFiles(event.target.files)) {
            event.preventDefault();
            (event.target.parentElement as HTMLFormElement)?.reset();
        } else {
            onFiles && onFiles(event.target.files);
        }
    }

    const handleOnDrop: React.DragEventHandler<HTMLInputElement> = (event) => {
        !validFiles(event.dataTransfer.files) && event.preventDefault();
    }

    return (
        <>
            <form onSubmit={handleOnSubmit} onReset={handleOnReset}>
                <input id="files" name="files[]" type="file" multiple={multiple} accept={accept} required={required} onDrop={handleOnDrop} onChange={handleOnChange} />
                <button type="reset">Clean</button>
                <button id="upload" name="upload" type="submit">Upload</button>
            </form>
        </>
    )
}

export default UploadFiles;