import React, { FC } from 'react';
import { Button, Table } from 'antd';
import { TextContext, useDashApi } from '@/views/Admin/EditTextManage/utils';
import { getViewpointList } from "@/api/group"
import TextDetail from "./comonents/TextDetail"
import './index.less'

interface DataType {
	title: string;
	time: number;
}

const TextPageManage: FC = () => {
	const reduderObj = useDashApi(getViewpointList)
	const { dispatch, viewPointList, loading } = reduderObj
	const columns: any = [
		{
			title: '内容标题',
			dataIndex: 'title',
			key: 'title',
			render: (text: string, row: DataType, index: number) => {
				return (
					<Button type="link" onClick={() => {
						dispatch({ type: 'CHANGE_STATUS', payload: true })
						dispatch({ type: 'INFO_DETAIL', payload: row })
					}}>
						{text}
					</Button>
				)
			},
		},
		{
			title: '上次更新',
			dataIndex: 'lastModifiedTime',
			key: 'lastModifiedTime',
		},
	]

	return (
		<div className="data-page-manage">
			<div className="dash-header">
				<div className="title">
					观点列表
				</div>
			</div>
			<div className="table-cont">
				<Table
					bordered
					rowKey={(row) => {
						return row.id
					}}
					columns={columns}
					dataSource={viewPointList}
					pagination={false}
					loading={loading}
				/>
			</div>

			<div>
				<TextContext.Provider value={reduderObj}>
					<TextDetail />
				</TextContext.Provider>
			</div>

		</div>
	)
}


export default TextPageManage