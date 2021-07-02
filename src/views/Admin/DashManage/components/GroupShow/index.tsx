import React, { FC, useContext } from 'react'
import { Modal, Button, Form, Input, Select, Row, Col } from 'antd';
import { DashContext }  from '@/views/Admin/DashManage/utils';
import GroupItem from '@/views/Admin/DashManage/components/GroupShow/GroupItem'
import './index.scss'

const GroupShow: FC = () => {
  const { showGroup, dispatch } = useContext(DashContext)
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Content of the modal');
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    // setModalText('The modal will be closed after two seconds');
    // setConfirmLoading(true);
    // setTimeout(() => {
    //   setVisible(false);
    //   setConfirmLoading(false);
    // }, 2000);
    dispatch({ type: 'SHOW_GROUP', payload: false })
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    dispatch({ type: 'SHOW_GROUP', payload: false })
  };

  return (
    <>
      <Modal
        className="group-show"
        title="组合展示"
        visible={showGroup}
        confirmLoading={confirmLoading}
        maskClosable={false}
        keyboard={false}
        width="50%"
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            返回
          </Button>
        ]}
      >
        <GroupItem/>
      </Modal>
    </>
  )
}
export default GroupShow
