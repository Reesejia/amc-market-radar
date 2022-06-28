import React, { FC, useContext, useState, useEffect } from 'react';
import { Drawer, Descriptions, Button, Divider, Form, Input, Row, Col, message } from "antd"
import { TextContext, labelStyle, contentStyle } from '@/views/Admin/EditTextManage/utils';
import { updateViewPoint } from "@/api/group"
import "./index.less"

interface fromDataType {
	content: string;
}

const TextDetail: FC = () => {
	const { status, viewPointInfo, dispatch, fetchData } = useContext(TextContext)
	const [editShow, setEditShow] = useState(false)
	const [form] = Form.useForm();

	let initialForm = {
		content: '',
	}

	useEffect(() => {
		if(editShow) {
			setFields()
		}
	}, [viewPointInfo,editShow])

	const setFields = () => {
		let { content } = viewPointInfo
		form.setFieldsValue({
			content
		})
	}

	const onSaveGroup = async (value: fromDataType) => {
		let params = {
			...value,
			id: viewPointInfo.id,
		}
		let res = await updateViewPoint(params)
		if (res.statusCode === 0 && res.success) {
			message.success("修改成功")
			fetchData()
			closeDrawer()
		}
	}

	const checkBoardName = (rules: object, value: string) => {
		if (value && value.length > 500) {
			return Promise.reject();
		}
		return Promise.resolve(true);
	};

	const closeDrawer = () => {
		dispatch({ type: 'CHANGE_STATUS', payload: false })
		setEditShow(false)
	}
	return (
		<div className="dash-detail">
			<Drawer
				title=""
				width="50%"
				placement="right"
				closable={false}
				onClose={closeDrawer}
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
							layout="horizontal"
							initialValues={initialForm}
							onFinish={onSaveGroup}
						>
							<Form.Item
								name="content"
								rules={[
									{ required: true, message: '输入机构观点' },
									{ message: '输入内容字符上限为500字', validator: checkBoardName }
								]}
							>
								<Input.TextArea placeholder="输入机构观点" maxLength={500} allowClear rows={10} />
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