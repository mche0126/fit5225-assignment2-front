import NiceTable from '@/components/management/NiceTable';
import { PageHeader } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';

export default function Management() {
  // const [current, setCurrent] = useState(0);
  const [data, setData] = useState([
    {
      id: 'Fetching data',
      url: 'Please wait',
      tag: ['Thank you'],
    },
  ]);

  const fetchData = () => {
    let scanImageURL: string = import.meta.env.VITE_IMAGE_SCAN.toString();
    axios.get(scanImageURL).then((res) => {
      console.log(res);
      setData(res.data);
    });
  };

  // fetchData();

  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="Management"
        subTitle="Manage images and tags manually"
      />
      <NiceTable data={data} />
    </div>
  );
}
