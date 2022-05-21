import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { prepareImageCall } from './prepareImageCall';
import { iWebLens } from '../detect/iWebLensCall';

export default function DragInPicture() {
  const { Dragger } = Upload;
  const [tags, setTags] = useState([]);

  const dummy = () => {
    return;
  };

  const props = {
    name: 'file',
    multiple: true,
    customRequest: dummy,
    beforeUpload: (file: any) => {
      const isImg = file.type === 'image/png' || file.type === 'image/jpeg';
      if (!isImg) {
        message.error(`${file.name} is not a png or jpg file`);
      }
      // return isImg || Upload.LIST_IGNORE;
      const reader = new FileReader();

      reader.onload = (e) => {
        let request = prepareImageCall(e.target.result.toString());
        iWebLens(request);
      };
      reader.readAsDataURL(file);

      return false; // Prevent upload
    },
    onChange(info: { file: { name?: any; status?: any }; fileList: any }) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: { dataTransfer: { files: any } }) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props} maxCount={1}>
      {console.log(props)}
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">Only accept .png/.jpg files</p>
    </Dragger>
  );
}
