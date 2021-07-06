import React, { FC, useContext, useEffect } from 'react'
import { Modal, Button } from 'antd';
import { DashContext } from '@/views/Admin/DashManage/utils';
import { navigationList } from '@/api/group'
import { NavListData } from '@/typing/Admin/groups'
import GroupItem from '@/views/Admin/DashManage/components/GroupShow/GroupItem'
import './index.scss'

const GroupShow: FC = () => {
  const { showGroup, dispatch } = useContext(DashContext)
  const [navList, setNavList] = React.useState<NavListData>([]);
  const [confirmLoading, setConfirmLoading] = React.useState(false);


  const handleOk = () => {
    dispatch({ type: 'SHOW_GROUP', payload: false })
  };

  const handleCancel = () => {
    dispatch({ type: 'SHOW_GROUP', payload: false })
  };

  const getNavigationList = async () => {
    const res = await navigationList()
    if (res.statusCode === 0 && res.success) {
      setNavList(res.data)
    }
  }

  useEffect(() => {
    getNavigationList()
  }, [])

  return (
    <>
      <Modal
        className="group-show"
        title="组合展示"
        visible={showGroup}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        destroyOnClose={true}
        maskClosable={false}
        keyboard={false}
        width="50%"
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            返回
          </Button>
        ]}
      >
        {
          navList.map((nav) => {
            return <GroupItem key={nav.id} getNavigationList={getNavigationList} groupData={nav}/>
          })
        }
      </Modal>
    </>
  )
}
export default GroupShow
