import React, { useCallback, useState } from 'react';
import style from '@/app.module.scss';
import { useDropzone } from 'react-dropzone';
import { Button, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const imageRecognition = axios.create({
  baseURL: import.meta.env.VITE_IMAGE_RECOGNITION_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET|POST',
  },
  withCredentials: false,
});

const recognizePic = async function (props: any, base64: string) {
  // get base64 string to right json format
  let req = { id: uuidv4(), image: base64 };

  await imageRecognition.post('/iWebLens', req).then(async (res) => {
    props.response(res.data);
  });
};

const Uploader = function (props: any) {
  const [image, setImage] = useState('');
  const [base64, setBase64] = useState('');
  const onDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles.length !== 1) {
      alert('Only one image is allowed at a time!');
      return;
    }
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
        <>
          <Button
            variant="success"
            className={style.Button}
            onClick={() => recognizePic(props, base64)}
          >
            Submit Picture to See Image Tag
          </Button>
          <Button
            className={style.Button}
            variant="danger"
            onClick={() => {
              setBase64('');
              setImage('');
            }}
          >
            Remove Uploaded Image
          </Button>
        </>
      )}
    </>
  );
};

export default Uploader;
