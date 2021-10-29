import type { NextPage } from 'next'
import React, { useState } from 'react'
import { PreviewImages, UploadFiles } from '~@components'

const uploadService = async (body: any) => {
  const res = await fetch('/api/v1/upload', {
    method: 'POST',
    body
  })
  return res;
}

const Home: NextPage = () => {
  const [files, setFiles] = useState<FileList>();
  const handleOnFiles = (files: FileList) => {
    setFiles(files);
  }
  const handleOnClear = () => {
    setFiles(undefined);
  }
  const handleOnUpload = (files: FileList, event?: React.FormEvent<HTMLFormElement>) => {
    const body = new FormData(event?.target as HTMLFormElement);
    uploadService(body);
  }
  return (
    <>
      <UploadFiles onFiles={handleOnFiles} onClear={handleOnClear} onUpload={handleOnUpload} />
      <PreviewImages files={files} />
    </>
  )
}

export default Home
