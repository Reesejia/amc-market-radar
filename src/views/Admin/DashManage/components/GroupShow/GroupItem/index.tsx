import React, { FC, useContext, useState, useEffect, useRef, useCallback } from 'react'
import { Button, Form, Input, Select, Row, Col, Table, message } from 'antd';
import { NavListInfo, NavListData, CreateGroup, NavGroupItem } from '@/typing/Admin/groups'
import { DashContext } from '@/views/Admin/DashManage/utils';
import { updateNavigation } from '@/api/group'
import { MenuOutlined } from '@ant-design/icons';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
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
  const [data, setData] = useState<NavListInfo>(() => initialData)
  const { grounpListInfo } = useContext(DashContext)
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { span: 24 },
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

  const onFinish = async (values: object) => {
    const res = await updateNavigation(data)
    if (res.statusCode === 0 && res.success) {
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
  }, [editStatus])

  const columns = [
    {
      title: '排序',
      key: "id",
      width: 60,
      render: (text: string, record: NavGroupItem, index: number) => {
        return editStatus ? <span>{index + 1}</span> : <span>{index + 1}</span>
      }
    },
    {
      title: '看板默认名称',
      dataIndex: 'dashboardName',
      key: 'dashboardName',
    },
    {
      title: '看板展示名称',
      dataIndex: 'displayName',
      key: 'displayName',
      render: (text: string, record: NavGroupItem) => {
        return editStatus ? <Form.Item
          style={{ margin: 0 }}
          name="displayName"
          rules={[
            {
              required: true,
              message: `看板展示名称 is required.`,
            },
          ]}
        >
          <Input />
        </Form.Item> : <span>{record. displayName || '-'}</span>
      }
    }
  ];


  const EditableCell: React.FC<EditableCellProps> = (record) => {
    console.log('record', record)
    return (
      <div>sss</div>
    )
    // return (
    //   <td {...restProps}>
    //     {editing ? (
    //       <Form.Item
    //         name={dataIndex}
    //         style={{ margin: 0 }}
    //         rules={[
    //           {
    //             required: true,
    //             message: `Please Input ${title}!`,
    //           },
    //         ]}
    //       >
    //         <Input />
    //       </Form.Item>
    //     ) : (
    //         children
    //       )}
    //   </td>
    // );
  };

  const type = 'DragableBodyRow';

  const DragableBodyRow = ({ index, moveRow, className, style, ...restProps }: {
    index: number,
    className: string,
    style: object,
    moveRow: Function
  }) => {
    const ref = useRef<HTMLTableRowElement>(null);
    const [{ isOver, dropClassName }, drop] = useDrop({
      accept: type,
      collect: monitor => {
        const { index: dragIndex }: NavGroupItem = monitor.getItem() || {};
        if (dragIndex === index) {
          return {};
        }
        return {
          isOver: monitor.isOver(),
          dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
        };
      },
      drop: (item: NavGroupItem) => {
        moveRow(item.index, index);
      },
    });
    const [, drag] = useDrag({
      type,
      item: { index },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    });
    drop(drag(ref));

    return (
      <tr
        ref={ref}
        className={`${className}${isOver ? dropClassName : ''}`}
        style={{ cursor: 'move', ...style }}
        {...restProps}
      />
    );
  };

  const components = {
    body: {
      row: DragableBodyRow,
    },
  };

  const moveRow = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragRow = data.navigationGroups[dragIndex];
      console.log('dragRow', dragRow)
      const row = update(data.navigationGroups, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRow],
        ],
      })
      console.log('row', row)
      data.navigationGroups = row
      setData(() => Object.assign({}, data));
    },
    [data],
  );


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

        {
          editStatus ?
            <DndProvider backend={HTML5Backend}>
              <Table
                pagination={false}
                dataSource={data.navigationGroups}
                columns={columns}
                rowKey={(record) => record.dashboardId}
                rowClassName={() => 'editable-row'}
                components={components}
                onRow={(record, index) => ({
                  index,
                  moveRow,
                } as unknown as NavGroupItem)}
              />
            </DndProvider>
            :
            <Table
              pagination={false}
              dataSource={props.groupData.navigationGroups}
              columns={columns}
              rowKey={(record) => record.dashboardId}
            />
        }

        {
          editStatus ?
            <Row justify="center" align="middle">
              <Form.Item {...tailLayout}>
                <Button onClick={() => changeEditStatus(false)} style={{ marginRight: '20px', marginTop: '20px' }}>返回</Button>
                <Button type="primary" htmlType="submit">确认</Button>
              </Form.Item>
            </Row>
            :
            null
        }

      </Form>
    </div>
  )
}
export default GroupItem
