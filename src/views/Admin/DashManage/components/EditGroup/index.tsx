import { saveGroup } from '@/api/group';
import React, { FC, useState, useEffect, useContext } from 'react';
import { Form, Input, Button, Transfer, message } from 'antd';
import { CreateGroup, DashItem, BoardDetail } from '@/typing/Admin/groups';
import { DashContext } from '@/views/Admin/DashManage/utils'
import './index.scss';
interface chidProps {
  boardDetail: BoardDetail
  onBoardDetail: Function
}
const { TextArea } = Input;
const EditGroup: FC<chidProps> = (props) => {
  const { boardDetail, onBoardDetail } = props;
  const { dispatch, fetchData, dashList, isCreate } = useContext(DashContext)
  const initialForm = {
    dashboardGroupName: '',
    allDashboardGroupMappings: [],
    comment: ''
  }
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    setFields()
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

  const onSaveGroup = async (values: CreateGroup) => {
    if (!isCreate) {
      values.id = boardDetail.id
    }
    values.dashboardGroupMappings = values.dashboardGroupMappings.map((key) => {
      return key = { dashboardId: key };
    });
    const res = await saveGroup(values);
    console.log('saveGroup res', res);
    if (res.statusCode === 0 && res.data) {
      message.success('操作成功');
      dispatch({ type: 'SET_EDIT_GROUP', payload: false })
      if (isCreate) {
        dispatch({ type: 'CHANGE_STATUS', payload: false })
      } else {
        onBoardDetail()
      }
      fetchData()
    }
  };

  const onFinishFailed = (errorInfo: object) => {
    console.log('Failed:', errorInfo);
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
