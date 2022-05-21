import React from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  beforeUpload: (file: { type: string; name: any }) => {
    const isImg = file.type === 'image/png' || file.type === 'image/jpeg';
    if (!isImg) {
      message.error(`${file.name} is not a png or jpg file`);
    }
    return isImg || Upload.LIST_IGNORE;
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

export default function DragInPicture() {
  return (
    <Dragger {...props} maxCount={1}>
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
