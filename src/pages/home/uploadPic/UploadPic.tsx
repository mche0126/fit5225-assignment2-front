import React, { useState } from 'react';
import { PageHeader, Button, message, Row, Col, Carousel, Image } from 'antd';
import './uploadPic.css';
import DragInPicture from '@/components/uploadPic/DragInPicture';
import ResultList from '@/components/detect/ResultList';

const success = () => {
  message.success('This is a success message');
};

// format of the image
const contentStyle = {
  height: '400px',
  width: '400px',
};

export default function UploadPic() {
  const [current, setCurrent] = useState(0);

  // set the current, destroy the upload elements, display the result elements
  const uploadPic = () => {
    success();
    setCurrent(current + 1);
  };

  const uploadAnother = () => {
    setCurrent(current - 1);
  };

  let data = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQY0vUTJwftJ8WqXoLiLeB--2MJkpZLpYOA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA45aLctefcJZt9LqfCNfGcTelNzbGMYLMJA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzronxEHP-KfhVOluJdzqDOo5LE7eKeT5LyQ&usqp=CAU',
    'https://rmrbcmsonline.peopleapp.com/upload/zw/bjh_image/1625801632_964cd23e1ed0ebe9b41c37c59ec653a3.jpeg?x-oss-process=style/w10',
  ];

  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="Search by Image"
        subTitle="Upload an image to find similar images"
      />
      {current === 0 && (
        <div>
          <DragInPicture />
          <div style={{ marginTop: '20px' }}>
            <Button type="primary" onClick={uploadPic}>
              Upload
            </Button>
          </div>
        </div>
      )}
      {current === 1 && (
        <div>
          <Row>
            <Col span={12}>
              <Carousel autoplay dotPosition="top">
                {data.map((item) => {
                  return (
                    <div key={data.indexOf(item)}>
                      <Image style={contentStyle} width={400} src={item} />
                    </div>
                  );
                })}
              </Carousel>
            </Col>
            <Col span={12}>
              <ResultList data={data} />
            </Col>
          </Row>
          <Button type="primary" onClick={uploadAnother}>
            Upload another picture
          </Button>
        </div>
      )}
    </div>
  );
}
