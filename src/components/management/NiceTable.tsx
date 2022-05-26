import { Form, Input, message, Popconfirm, Table, Tag } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import type { FormInstance } from 'antd/lib/form';
import './niceTable.css';
import axios from 'axios';
import { unique } from '@/components/common';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  id: string;
  url: string;
  tag: string[];
  image: string;
}

interface EditableRowProps {
  index: number;
}

// eslint-disable-next-line no-unused-vars
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  // eslint-disable-next-line no-unused-vars
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      let values = await form.validateFields();
      // Only use the code below when we only need to modify the tag
      // If we need to modify ID and URL, make sure add more validations
      if (typeof values.tag === 'string') {
        values.tag = values.tag.split(',');
      }
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  id: string;
  url: string;
  tag: string[];
  image: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export default function NiceTable() {
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      image: 'Yo there!',
      id: 'Fetching data',
      url: 'Please wait',
      tag: ['Thank you'],
    },
  ]);
  const [dataIsUpToDate, setDataIsUpToDate] = useState(0);

  const updateData = () => {
    setDataIsUpToDate(1);
    let scanImageURL: string = import.meta.env.VITE_IMAGE_SCAN.toString();
    axios
      .get(scanImageURL, {
        headers: {
          'content-type': 'text/json',
          Authorization: localStorage.getItem('id-token'),
        },
      })
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].tag = unique(res.data[i].tag);
        }
        console.log(res);
        setDataSource(res.data);
      })
      .catch(() => {
        setDataIsUpToDate(0);
      });
  };

  if (dataIsUpToDate === 0) {
    updateData();
  }
  // const [count, setCount] = useState(2);

  const handleDelete = (url: string) => {
    console.log('delete request posted' + { url });
    let deleteImageURL: string = import.meta.env.VITE_IMAGE_DELETE.toString();
    axios
      .post(
        deleteImageURL,
        {
          s3url: unique([url]),
        },
        {
          headers: {
            Authorization: localStorage.getItem('access-token'),
          },
        },
      )
      .catch((error) => {
        console.log(error);
        if (error.code === 'ERR_NETWORK') {
          const newData = dataSource.filter((item) => item.url !== url);
          message.success('delete error.');
          setDataSource(newData);
        }
      })
      .then((res) => {
        console.log(res);
      });
  };

  // @ts-ignore
  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '10%',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      width: '20%',
      render: (image, id) => (
        <>
          <img
            width={100}
            src={'data:image/jpeg;base64,' + image}
            alt={id.toString()}
          />
        </>
      ),
    },
    {
      title: 'URL',
      dataIndex: 'url',
    },
    {
      title: 'Tags',
      dataIndex: 'tag',
      editable: true,
      render: (tag) => (
        <>
          {unique(tag).map((t: string) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            return (
              <Tag color={color} key={t}>
                {t.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record: any) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.url)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  // const handleAdd = () => {
  //   // @ts-ignore
  //   const newData: DataType = {
  //     id: `Edward King`,
  //     url: '32',
  //     tag: ['0', '1'],
  //   };
  //   setDataSource([...dataSource, newData]);
  //   setCount(count + 1);
  // };

  // TODO: upload the modified tag to database
  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
}
