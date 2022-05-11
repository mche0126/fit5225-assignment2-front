import React, { useCallback } from 'react';
import style from '@/app.module.scss';
import { useDropzone } from 'react-dropzone';

const Upload = function () {
  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      let fileName = file.name.toLowerCase();
      if (
        !fileName.includes('.jpg') &&
        !fileName.includes('.jpeg') &&
        !fileName.includes('.png') &&
        !fileName.includes('.svg')
      )
        alert('Please upload only image files.');
      else {
        const reader = new FileReader();
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = () => {
          const img = reader.result;
          let base64 = img
            .toString()
            .replace(/^data:image\/(svg|jpeg|png|jpg);base64,/, '');
          console.log(base64);

          // TODO: add axio call to backend from here
        };
        reader.readAsDataURL(file);
      }
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <h1 className={style.page_title}>Please upload a picture</h1>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className={style.Uploader}>Drop the files here</p>
        ) : (
          <p className={style.Uploader}>
            Drag and drop some files here, or click to select files
          </p>
        )}
      </div>
    </>
  );
};

export default Upload;
