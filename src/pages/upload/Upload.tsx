import React, { useCallback, useState } from 'react';
import style from '@/app.module.scss';
import { useDropzone } from 'react-dropzone';
import { Button, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const recognizePic = async function (base64: string) {
  console.log(import.meta.env.BASE_URL);
  await axios({
    method: 'post',
    url: import.meta.env.BASE_URL,
    data: {
      id: uuidv4,
      image: base64,
    },
  });
};

const Upload = function () {
  const [image, setImage] = useState('');
  const [base64, setBase64] = useState('');
  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      // format file name
      let fileName = file.name.toLowerCase();

      // check file extension
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
          setBase64(
            img
              .toString()
              .replace(/^data:image\/(svg|jpeg|png|jpg);base64,/, ''),
          );
          setImage(img.toString());
        };
        reader.readAsDataURL(file);
      }
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <h1 className={style.page_title}>Please upload a picture</h1>
      <div {...getRootProps()} className={style.Uploader}>
        <input {...getInputProps()} />
        {image === '' ? (
          isDragActive ? (
            <p>Drop the files here</p>
          ) : (
            // drag function activated
            <p>Drag and drop some files here, or click to select files</p>
          )
        ) : (
          // image uploaded
          <>
            <Container>
              <div>
                <Row>
                  <img
                    src={image}
                    alt="uploaded file"
                    style={{ height: 'auto', width: '70vw' }}
                  />
                </Row>
                <Row></Row>
              </div>
            </Container>
          </>
        )}
      </div>
      {image === '' ? null : (
        <Button className={style.Button} onClick={() => recognizePic(base64)}>
          Submit Picture to See Image Tag
        </Button>
      )}
    </>
  );
};

export default Upload;
