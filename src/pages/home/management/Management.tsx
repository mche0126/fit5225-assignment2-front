import NiceTable from '@/components/management/NiceTable';
import { PageHeader } from 'antd';
import React from 'react';

const data = [
  {
    key: '1',
    name: 'John Brown',
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '888',
    name: '000027365124.jpg',
    address: 'https://miro.medium.com/max/356/1*EnF9uIN_u2_X7ey24lB7Tg.png',
    tags: ['human', 'gun'],
  },
];

export default function Management() {
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
