import React, { FC, useState, useEffect, useContext } from 'react';
import { Drawer, Descriptions, Button, Divider, Modal, Tag, Row, Col } from 'antd';
import EditGroup from '@/views/Admin/DashManage/components/EditGroup';
import { DashContext, labelStyle, contentStyle, infoLabelStyle, infoContentStyle } from '@/views/Admin/DashManage/utils';
import { BoardDetail, DashItem, AnchorInfo } from '@/typing/Admin/groups';
import { getBoardDetail } from '@/api/group';
import './index.less';

const { confirm } = Modal;

interface ChidProps {
}
const DashDetail: FC<ChidProps> = (props: ChidProps) => {
  const { status, groupId, dispatch, isCreate, isEditGroup } = useContext(DashContext)
  const initalBoard = {
    allDashboardGroupMappings: [],
    dashboardGroupMappings: [],
    comment: '',
    id: '',
    updateByName: '',
    lastModifiedTime: '',
    createTime: '',
    dashboardGroupName: '',
    used: false,
    initValue: false
  }
  const [boardDetail, setBoardDetail] = useState<BoardDetail>(initalBoard);

  useEffect(() => {
    onBoardDetail();
  }, [groupId]);

  const onBoardDetail = async () => {
    const id = groupId.id
    if (id) {
      const res = await getBoardDetail(id);
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
          dispatch({ type: 'SET_EDIT_GROUP', payload: true })
        },
        onCancel() {
        }
      });
    } else {
      dispatch({ type: 'SET_EDIT_GROUP', payload: true })
    }
  };
  return (
    <div className="dash-detail">
      <Drawer
        width="70%"
        title=""
        placement="right"
        closable={false}
        visible={status}
        onClose={() => dispatch({ type: 'CHANGE_STATUS', payload: false })}
      >
        <Descriptions
          title={boardDetail.dashboardGroupName}
          labelStyle={labelStyle}
          contentStyle={contentStyle}
          layout="vertical"
          size={'small'}
          extra={
            !isEditGroup ? boardDetail.initValue ? <Button disabled>
              编辑
            </Button> :
              <Button type="primary" onClick={() => handleEditGroup(boardDetail.used)}>
                编辑
              </Button> : ""
          }
        >
          <Descriptions.Item label="修改人">{isCreate ? '-' : boardDetail.updateByName || '-'}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{isCreate ? '-' : boardDetail.createTime || '-'}</Descriptions.Item>
          <Descriptions.Item label="最近修改时间">{isCreate ? '-' : boardDetail.lastModifiedTime || '-'}</Descriptions.Item>
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
            <Divider />
            <Descriptions
              title="锚点信息:"
              labelStyle={infoLabelStyle}
              contentStyle={infoContentStyle}
              size={'middle'}
              style={{ marginTop: '20px' }}
            >
            </Descriptions>
            {boardDetail.dashboardGroupMappings.map((item: DashItem) => (
              <>
                <Row key={item.id}>
                  <Col span={24}>
                    <Tag color="blue">{item.dashboardName}</Tag>
                  </Col>
                </Row>
                <Descriptions className='m-t-10'>
                  {item.dashboardGroupChartIdMappingList?.map((anchorItem: AnchorInfo) => (
                    <Descriptions.Item key={anchorItem.id} label={anchorItem.anchorName}>{anchorItem.anchorId}</Descriptions.Item>
                  ))}
                </Descriptions>
              </>
            ))}
          </div>
        )}
      </Drawer>

    </div>
  );
};

export default DashDetail;
