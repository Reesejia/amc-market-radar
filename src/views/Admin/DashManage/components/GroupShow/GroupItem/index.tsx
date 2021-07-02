import React, { FC, useContext, useState, useEffect } from 'react'
import { Button, Form, Input, Select, Row, Col, Table, message } from 'antd';
import { NavListInfo, NavListData, CreateGroup, NavGroupItem } from '@/typing/Admin/groups'
import { DashContext } from '@/views/Admin/DashManage/utils';
import { updateNavigation } from '@/api/group'
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import arrayMove from 'array-move';
import "./index.scss"
interface GroupProps {
  groupData: NavListInfo;
}


interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: 'number' | 'text';
  record: NavGroupItem;
  index: number;
  children: React.ReactNode;
}

const initialData = {
  navigationGroups: [],
  id: "",
  navigationName: "",
  dashboardGroupName: ""
};
const GroupItem: FC<GroupProps> = (props: GroupProps) => {
  const { groupData } = props
  console.log('GroupProps props', props)
  const [editStatus, changeEditStatus] = useState(false)
  const [data, setData] = useState<NavListInfo>(initialData)
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

  const onFinish = async(values: object) => {
    const res = await updateNavigation(data)
    if(res.statusCode === 0 && res.success){
      message.success('修改成功')
    }
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

  const fillTable = () => {
    groupData.navigationGroups = groupData.navigationGroups.map((navGroup: NavGroupItem) => {
      navGroup.key = navGroup.id
      navGroup.displayName = "更改后的看板名称"
      return navGroup
    })
    console.log('groupData data', data)
    setData(groupData)
  }

  useEffect(() => {
    onFill()
    fillTable()
  }, [])

  const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);
  const columns = [
    {
      title: '排序',
      dataIndex: 'xx',
      width: 60,
      className: 'drag-visible',
    },
    {
      title: '看板默认名称',
      dataIndex: 'dashboardName',
    },
    {
      title: '看板展示名称',
      dataIndex: 'displayName',
      editable: true,
    }
  ];

  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
            children
          )}
      </td>
    );
  };


  const SortableItem = SortableElement((props: object) => {
    console.log('SortableItem props', props)

    return <tr {...props} />
  });
  const SortableContainerBox = SortableContainer((props: object) => <tbody {...props} />);

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMove([...data.navigationGroups], oldIndex, newIndex).filter(el => !!el);
      console.log('Sorted items: ', newData);
      // setData(newData)
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
    const index = data.navigationGroups.findIndex(x => x.index === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
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
        {/*
        <Table
          pagination={false}
          dataSource={data.navigationGroups}
          columns={columns}
          rowKey="id"
          components={{
            body: {
              wrapper: DraggableContainer,
              row: DraggableBodyRow,
            },
          }}
        /> */}

        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          pagination={false}
          dataSource={props.groupData.navigationGroups}
          columns={columns}
          rowKey="id"
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
