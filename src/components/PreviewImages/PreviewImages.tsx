import React, { useCallback, useEffect, useState } from "react";
import generatePreview from "~@utils/image-base64";

export interface PreviewImage {
    file?: File;
}

const PreviewImage: React.FC<PreviewImage> = ({ file }) => {
    const [{ src, loading }, setState] = useState<{ src?: string; loading?: boolean }>({ loading: false });
    const preview = useCallback(async (file) => {
        setState(state => ({ ...state, loading: true }))
        const dataUrl = await generatePreview(file);
        setState(state => ({ ...state, src: dataUrl?.toString(), loading: false }));
    }, []);
    useEffect(() => {
        if (file) {
            preview(file);
        }

    }, [file, preview])
    if (loading) {
        return <>Loading...</>
    }
    // eslint-disable-next-line @next/next/no-img-element
    return <>{src && (<img src={src} alt={file?.name} width="280px" height="320px" />)}</>
}

export interface PreviewImages {
    files?: FileList;
}

const PreviewImages: React.FC<PreviewImages> = ({ files }) => {
    const imageList = (files: FileList): JSX.Element[] => {
        const images: JSX.Element[] = [];
        for (let i = 0; i < files?.length; i++) {
            images.push(<PreviewImage file={files[i]} key={files[i].name} />);
        }
        return images;
    }

    return <>{files && files?.length > 0 && imageList(files)}</>
}

export default PreviewImages;