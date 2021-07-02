import React, { FC, useContext, useState, useEffect } from 'react'
import { Button, Form, Input, Select, Row, Col, Table } from 'antd';
import { NavListInfo, NavListData, CreateGroup } from '@/typing/Admin/goups'
import { DashContext } from '@/views/Admin/DashManage/utils';
import {updateNavigation} from '@/api/group'
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import arrayMove from 'array-move';
import "./index.scss"
interface GroupProps {
  groupData: NavListInfo
}
const initialData = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    index: 0,
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    index: 1,
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    index: 2,
  },
];
const GroupItem: FC<GroupProps> = (props: GroupProps) => {
  const { groupData } = props
  console.log('GroupProps props', props)
  const [editStatus, changeEditStatus] = useState(false)
  const [data, setData] = useState(initialData)
  const { grounpListInfo } = useContext(DashContext)
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const { Option } = Select;

  const onGenderChange = (value: string) => {
    console.log('onGenderChange', value)
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        return;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        return;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
    }
  };

  const onFinish = (values: object) => {
    // updateNavigation()
    console.log('onFinish', values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    console.log('111', groupData.navigationName)
    form.setFieldsValue({
      navigationName: groupData.navigationName,
      dashboardGroupName: groupData.dashboardGroupName
    });
  };

  useEffect(() => {
    onFill()
  }, [])

  const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);
  const columns = [
    {
      title: 'Sort',
      dataIndex: 'sort',
      width: 30,
      className: 'drag-visible',
      render: () => <DragHandle />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      className: 'drag-visible',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const SortableItem = SortableElement((props: object) => {
    console.log('SortableItem props', props)

    return <tr {...props} />
  });
  const SortableContainerBox = SortableContainer((props: object) => <tbody {...props} />);

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMove([...data], oldIndex, newIndex).filter(el => !!el);
      console.log('Sorted items: ', newData);
      setData(newData)
    }
  };

  const DraggableContainer = (props: object) => {
    console.log('DraggableContainer props', props)
    return (
      <SortableContainerBox
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      hideSortableGhost={true}
      {...props}
    />
    )
  }

  const DraggableBodyRow = ({ className, ...restProps }: { className: string, 'data-row-key': number }) => {
    console.log('restProps', restProps)
    const index = data.findIndex(x => x.index === restProps['data-row-key']);
    return <SortableItem  index={index} {...restProps}/>;
  };
  console.log('grounpListInfo.content11', grounpListInfo.content)
  return (
    <div className="edit-group-form">
      <Form {...layout} form={form} onFinish={onFinish}>
        <Row justify="center" align="middle">
          <Col span={12}>
            <Form.Item label="导航栏名称" name="navigationName" rules={[{ required: true }]}>
              <Input disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item >
              {
                !editStatus ? <a onClick={() => changeEditStatus(true)} style={{ paddingLeft: '5px' }}>修改</a>
                  : null
              }
            </Form.Item>
          </Col>

        </Row>

        {
          editStatus ?

            <Col span={12}>
              <Form.Item name="dashboardGroupName" label="选择组合" rules={[{ required: true, message: "选择组合是必选项" }]}>
                <Select
                  placeholder="Select a option and change input text above"
                  onChange={onGenderChange}
                >
                  {
                    grounpListInfo.content.map((group: CreateGroup) => {
                      return <Option value={group.id as string} >{group.dashboardGroupName}</Option>
                    })
                  }
                </Select>
              </Form.Item>
            </Col>
            :

            <Col span={12}>
              <Form.Item name="dashboardGroupName" label="选择组合" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
        }

        <Table
          pagination={false}
          dataSource={data}
          columns={columns}
          rowKey="index"
          components={{
            body: {
              wrapper: DraggableContainer,
              row: DraggableBodyRow,
            },
          }}
        />

        <Form.Item {...tailLayout}>
          <Button onClick={() => changeEditStatus(false)}>
            取消
        </Button>
          <Button type="primary" htmlType="submit">
            Submit
        </Button>

          <Button type="link" htmlType="button" onClick={onFill}>
            Fill form
        </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default GroupItem
