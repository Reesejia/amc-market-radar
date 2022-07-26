import { saveGroup } from '@/api/group';
import React, { FC, useState, useEffect, useContext } from 'react';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { Row, Col, Form, Input, Button, Transfer, message, Space } from 'antd';
import { CreateGroup, DashItem, BoardDetail, AnchorInfo } from '@/typing/Admin/groups';
import { DashContext } from '@/views/Admin/DashManage/utils'
import './index.less';
interface chidProps {
  boardDetail: BoardDetail
  onBoardDetail: Function
}

const { TextArea } = Input;
const EditGroup: FC<chidProps> = (props) => {
  const { boardDetail, onBoardDetail } = props;
  const { dispatch, fetchData, getNavigationList, dashList, isCreate } = useContext(DashContext)
  const initialForm = {
    dashboardGroupName: '',
    allDashboardGroupMappings: [],
    comment: ''
  }
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [form] = Form.useForm();
  const [anchorList, setanchorList] = useState<number[]>([])
  useEffect(() => {
    setFields()
    console.log("@@@boardDetail", boardDetail)
  }, [boardDetail])

  const setFields = () => {
    if (!isCreate) {
      form.setFieldsValue({
        comment: boardDetail.comment,
        dashboardGroupName: boardDetail.dashboardGroupName,
        dashboardGroupMappings: boardDetail.dashboardGroupMappings.map((item) => item.dashboardId)
      });
      const tarKeys: string[] = boardDetail && boardDetail.dashboardGroupMappings.map((dash: DashItem) => dash.dashboardId)
      setTargetKeys(tarKeys)
    }
  }

  const getAnchorsData = (key: string, list: AnchorInfo[]): AnchorInfo[] => {
    let keys = key.split('～')
    console.log(key, keys)
    let id = keys[1], dashboardId = keys[2]
    let anchorList = [] as AnchorInfo[]
    list.map((item: AnchorInfo) => {
      let params = {
        ...item,
        dashboardId,
        dashboardGroupId: id,
      }
      anchorList.push(params)
    })
    return anchorList
  }

  const onSaveGroup = async (values: CreateGroup) => {
    if (!isCreate) {
      values.id = boardDetail.id
    }
    values.dashboardGroupMappings = values.dashboardGroupMappings.map((key) => {
      return key = { dashboardId: key };
    });
    let anchorInfoList = [] as AnchorInfo[]
    for (let i in values) {
      if (i.indexOf('anchors') > -1) {
        anchorInfoList = anchorInfoList.concat(getAnchorsData(i, values[i]))
        delete values[i]
      }
    }

    values.dashboardGroupChartIdMappingList = anchorInfoList

    const res = await saveGroup(values);
    if (res.statusCode === 0 && res.data) {
      message.success('操作成功');
      dispatch({ type: 'SET_EDIT_GROUP', payload: false })
      if (isCreate) {
        dispatch({ type: 'CHANGE_STATUS', payload: false })
      } else {
        onBoardDetail()
      }
      fetchData()
      getNavigationList()
    }
  };

  const onFinishFailed = (errorInfo: object) => {
  };

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys);
    checkBord()
  };

  const onSelectChange = (sourceSelectedKeys: Array<string>, targetSelectedKeys: Array<string>) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const oncancel = () => {
    if (isCreate) {
      dispatch({ type: 'CHANGE_STATUS', payload: false })
    } else {
      dispatch({ type: 'SET_EDIT_GROUP', payload: false })
    }
  };
  const checkBord = () => {
    return Promise.resolve(targetKeys.length > 0);
  };

  const checkBoardName = (rules: object, value: string) => {
    if (value.length > 10) {
      return Promise.reject();
    }
    return Promise.resolve(true);
  };

  const addanchorList = () => {
    anchorList.push(1)
    setanchorList(anchorList)
    console.log("@@@anchorList", anchorList)
  }

  const removeAhchorList = (index: number) => {
    anchorList.splice(index, 1)
    setanchorList(anchorList)
  }
  return (
    <div className="edit-group-wraper">
      <Form
        form={form}
        name="basic"
        layout="vertical"
        initialValues={initialForm}
        onFinish={onSaveGroup}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="组合名称"
          name="dashboardGroupName"
          rules={[
            { required: true, message: '请输入组合名称' },
            { message: '组合名称最多输入10位', validator: checkBoardName }
          ]}
        >
          <Input placeholder="输入组合名称" maxLength={11} allowClear />
        </Form.Item>

        <Form.Item
          label="选择看板"
          name="dashboardGroupMappings"
          rules={[{ required: true, message: '请选择看板' }, { validator: checkBord }]}
        >
          <Transfer
            rowKey={record => record.id}
            dataSource={dashList}
            titles={['源看板', '目标看板']}
            listStyle={{
              width: 300,
              height: 300,
            }}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={onChange}
            onSelectChange={onSelectChange}
            render={(item: DashItem) => item.title}
          />

        </Form.Item>

        <Form.Item label="备注" name="comment">
          <TextArea placeholder="输入备注信息" allowClear showCount maxLength={20} />
        </Form.Item>
        <Row>
          {boardDetail.dashboardGroupMappings.map((item,index) =>
            <Col span={11} key={item.id} offset={ index % 2 === 1 ? 1 : 0}>
              <Form.List name={`anchors～${item.id}～${item.dashboardId}`} initialValue={item.dashboardGroupChartIdMappingList}>
                {(fields, { add, remove }) => (
                  <>
                    <Form.Item>
                      <Row>
                        <Col span={2}>
                          <Button type="primary" size="small" onClick={() => add()} icon={<PlusOutlined />}>
                            {`${item.dashboardName}锚点`}
                          </Button>
                        </Col>
                      </Row>
                    </Form.Item>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8, alignItems: 'center' }} align="baseline">
                        <Form.Item
                          {...restField}
                          label="锚点名称"
                          name={[name, "anchorName"]}
                          rules={[{ required: true, message: '请输入锚点名称' }]}
                        >
                          <Input placeholder="锚点名称" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          label="锚点id"
                          name={[name, "anchorId"]}
                          rules={[{ required: true, message: '请输入锚点id' }]}
                        >
                          <Input placeholder="锚点id" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} style={{ marginTop: '20px' }} />
                      </Space>
                    ))}
                  </>
                )}
              </Form.List>
            </Col>
          )}
        </Row>


        <Form.Item>
          <div className="footerBtn">
            <Button htmlType="button" onClick={oncancel}>
              取消
            </Button>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 20 }}>
              确认
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditGroup;
