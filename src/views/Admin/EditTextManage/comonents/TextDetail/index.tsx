import React, { FC, useContext, useState } from 'react';
import { Drawer, Descriptions, Button, Divider, Form, Input, Row, Col, message } from "antd"
import { TextContext, labelStyle, contentStyle } from '@/views/Admin/EditTextManage/utils';
import { updateViewPoint } from "@/api/group"
import "./index.less"
const TextDetail: FC = () => {
	const { status,viewPointInfo, dispatch, fetchData } = useContext(TextContext)
	const [editShow, setEditShow] = useState(false)
	const [form] = Form.useForm();

	let initialForm = {
		content: viewPointInfo.content
	}
	const onSaveGroup = async (value: any) => {
		let params = {
			id: viewPointInfo.id,
			content: value.content
		}
		let res = await updateViewPoint(params)
		if (res.statusCode === 0 && res.success) {
			message.success("修改成功")
			fetchData()
			closeDrawer()
		}
	}

	const checkBoardName = (rules: object, value: string) => {
		if (value.length > 100) {
			return Promise.reject();
		}
		return Promise.resolve(true);
	};

	const closeDrawer = () => {
		dispatch({ type: 'CHANGE_STATUS', payload: false })
	}
	return (
		<div className="dash-detail">
			<Drawer
				title=""
				width="50%"
				placement="right"
				closable={false}
				onClose={() => {
					dispatch({ type: 'CHANGE_STATUS', payload: false })
				}}
				visible={status}
			>
				<Descriptions
					title={viewPointInfo.title}
					labelStyle={labelStyle}
					contentStyle={contentStyle}
					size={'small'}
					layout="vertical"
				>
					<Descriptions.Item label="创建人">{viewPointInfo.createByName}</Descriptions.Item>
					<Descriptions.Item label="最后一次修改时间">{viewPointInfo.lastModifiedTime}</Descriptions.Item>
				</Descriptions>
				<Divider />
				{!editShow ? (
					<Descriptions title="观点内容"
						extra={
							<Button type="primary" onClick={() => setEditShow(true)}>
								编辑
							</Button>
						}
					>
						<Descriptions.Item>{viewPointInfo.content}</Descriptions.Item>
					</Descriptions>
				) : null}

				{editShow ?
					<>
						<Descriptions title="观点内容" />
						<Form
							form={form}
							name="basic"
							layout="vertical"
							initialValues={initialForm}
							onFinish={onSaveGroup}
						>
							<Form.Item
								name="content"
								rules={[
									{ required: true, message: '输入机构观点' },
									{ message: '组合名称最多输入100位', validator: checkBoardName }
								]}
							>
								<Input.TextArea placeholder="输入机构观点" maxLength={11} allowClear rows={10} />
							</Form.Item>
							<Form.Item>
								<Row>
									<Col span="4" offset="8">
										<Button htmlType="button" onClick={closeDrawer}>
											取消
										</Button>
									</Col>
									<Col span="4">
										<Button type="primary" htmlType="submit" >
											确认
										</Button>
									</Col>
								</Row>
							</Form.Item>
						</Form>
					</> : null}
			</Drawer>
		</div>
	)
}

export default TextDetail;