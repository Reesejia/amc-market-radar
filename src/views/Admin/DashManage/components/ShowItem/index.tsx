import React, { FC, useState, useEffect, useContext } from 'react';
import { Drawer, Descriptions, Button, Divider, Modal, Tag } from 'antd';
import EditGroup from '../EditGroup/index';
import { getBoardDetail } from '@/api/group';
import { BoardDetail, DashItem } from '@/typing/Admin/goups';
import {useDashApi, DashContext, labelStyle, contentStyle, infoLabelStyle, infoContentStyle} from '../../utils'
import './index.scss';

const { confirm } = Modal;

interface ChidProps {
}
const ShowItem: FC<ChidProps> = (props: ChidProps) => {
  const {status, groupId, dispatch, isCreate, isEditGroup } = useContext(DashContext)
  const initalBoard = {
    allDashboardGroupMappings: [],
    dashboardGroupMappings: [],
    comment: '',
    id: '',
    updateByName: '',
    lastModifiedTime: '',
    createTime: '',
    dashboardGroupName: '',
    used: false
  }
  const [boardDetail, setBoardDetail] = useState<BoardDetail>(initalBoard);

  useEffect(() => {
      onBoardDetail();
    },[groupId]);

  const onBoardDetail = async () => {
    if (groupId) {
      const res = await getBoardDetail(groupId);
      if (res.statusCode === 0 && res.success) {
        setBoardDetail(res.data);
      }
    }
  };

  const handleEditGroup = (used: boolean) => {
    if (used) {
      const title = (
        <div style={{ fontSize: 14 }}>
          该组合当前已启用，修改组合信息将<span style={{ color: 'red' }}>重置展示名称及顺序</span>，是否继续修改?
        </div>
      );
      confirm({
        title,
        okText: '继续',
        cancelText: '取消',
        onOk() {
          dispatch({type: 'SET_EDIT_GROUP', payload: true})
        },
        onCancel() {
          console.log('Cancel');
        }
      });
    } else {
      dispatch({type: 'SET_EDIT_GROUP', payload: true})
    }
  };
  console.log('status22', status)
  return (
    <div className="showItem">
      <Drawer
        width="70%"
        title=""
        placement="right"
        closable={false}
        visible={status}
        onClose={() => dispatch({type: 'CHANGE_STATUS', payload: false})}
      >
        <Descriptions
          title={boardDetail.dashboardGroupName}
          labelStyle={labelStyle}
          contentStyle={contentStyle}
          layout="vertical"
          size={'small'}
          extra={
            !isEditGroup && (
              <Button type="primary" onClick={() => handleEditGroup(boardDetail.used)}>
                编辑
              </Button>
            )
          }
        >
          <Descriptions.Item label="修改人">{boardDetail.updateByName || '-'}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{boardDetail.createTime || '-'}</Descriptions.Item>
          <Descriptions.Item label="最近修改时间">{boardDetail.lastModifiedTime || '-'}</Descriptions.Item>
        </Descriptions>
        <Divider />
        {isEditGroup ? (
          <EditGroup
            boardDetail={boardDetail}
            onBoardDetail={onBoardDetail}
          />
        ) : (
            <div className="groupInfo">
              <Descriptions
                labelStyle={infoLabelStyle}
                contentStyle={infoContentStyle}
                column={1}
                layout="vertical"
                size={'middle'}
              >
                <Descriptions.Item label="组合名称">
                  {boardDetail.dashboardGroupName}
                </Descriptions.Item>
                <Descriptions.Item label="已选看板">
                  {boardDetail.dashboardGroupMappings.map((item: DashItem) => (
                    <Tag key={item.id}>{item.dashboardName}</Tag>
                  ))}
                </Descriptions.Item>

                <Descriptions.Item label="备注">{boardDetail.comment}</Descriptions.Item>

                <Descriptions.Item label="组合状态">
                  {
                    boardDetail.used ?
                      (<Tag color="blue">已启用</Tag>) :
                      (<Tag color="volcano">未启用</Tag>)
                  }
                </Descriptions.Item>
              </Descriptions>
            </div>
          )}
      </Drawer>

    </div>
  );
};

export default ShowItem;
