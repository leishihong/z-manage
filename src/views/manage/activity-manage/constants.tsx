import { Fragment } from "react";
import { Button, Tooltip, Image, Tag, Space, Divider } from "antd";
import dayjs from "dayjs";
import { map } from "lodash";
import { status, applyStatus, communityTagType } from "constants/config";

export const ContentType = ["图文", "横版短视频", "竖版短视频"];
export const FilterType = ["规则筛选", "人工"];
export const Status = ["未上线", "已上线"];

export function getColumns(callback: (record: Record<string, any>, type: string, recordInd?: number) => Promise<void>) {
	return [
		{
			title: "社团名称",
			dataIndex: "communityName",
			width: 200,
		},
		{
			title: "分类",
			dataIndex: "circleCategoryName",
			render: (text: string, record: any) => [text, record.circleName].join("-"),
			width: 200,
		},
		{
			title: "简介",
			dataIndex: "communityDesc",
			ellipsis: {
				showTitle: false,
			},
			render: (text: string) => (
				<Tooltip placement="topLeft" title={text}>
					{text}
				</Tooltip>
			),
		},
		{
			title: "社团类型",
			dataIndex: "tag",
			width: 100,
			render: (text: string) => (String(text) ? <Tag>{communityTagType[text]}</Tag> : "-"),
		},
		{
			title: "社团头图",
			dataIndex: "communityHeadPhotoUrl",
			width: 100,
			render: (text: string) =>
				text ? (
					<Image
						width={80}
						src={text}
						preview={{
							src: text,
						}}
					/>
				) : (
					"-"
				),
		},
		{
			title: "社团头像",
			dataIndex: "communityPortraitUrl",
			width: 100,
			render: (text: string) =>
				text ? (
					<Image
						width={80}
						src={text}
						preview={{
							src: text,
						}}
					/>
				) : (
					"-"
				),
		},
		{
			title: "审核状态",
			dataIndex: "status",
			width: 100,
			render: (text: string, record: any) =>
				String(text) ? (
					<Tag color={["0", ""].includes(record.status) ? "orange" : record.status == "2" ? "red" : "green"}>
						{applyStatus[text]}
					</Tag>
				) : (
					"-"
				),
		},
		{
			title: "邮箱",
			dataIndex: "contactEmail",
			width: 200,
		},
		{
			title: "姓名",
			dataIndex: "contactName",
			width: 200,
		},
		{
			title: "手机号",
			dataIndex: "contactPhone",
			width: 200,
		},
		{
			title: "拒绝原因",
			dataIndex: "applyDesc",
			width: 200,
		},
		{
			title: "创建时间",
			dataIndex: "createTime",
			render: (text: any) => (text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-"),
			width: 200,
		},
		{
			title: "更新时间",
			dataIndex: "updateTime",
			render: (text: any) => (text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-"),
			width: 200,
		},
		{
			title: "操作",
			width: 130,
			fixed: "right",
			headerCellStyle: { paddingLeft: "15px" },
			render: (_: any, record: any, index: number) => (
				<Fragment>
					<Button type="link" size="small" onClick={() => callback(record, "view")}>
						查看
					</Button>
					{record.status !== "1" && (
						<>
							{["0", "2"].includes(record.status) && (
								<Button
									type="link"
									size="small"
									disabled={[""].includes(record.status)}
									onClick={() => callback(record, "status", index)}
								>
									通过
								</Button>
							)}
							{record.status === "1" && (
								<Button
									type="link"
									size="small"
									disabled={[""].includes(record.status)}
									onClick={() => callback(record, "status", index)}
								>
									拒绝
								</Button>
							)}
						</>
					)}
				</Fragment>
			),
		},
	];
}

const dataSource = map(Object.keys(applyStatus), (item) => ({ value: item, label: applyStatus[item] }));

export const formFieldList: any = [
	{ fieldName: "社团名称", field: "communityName", fieldType: "input" },
	{ fieldName: "手机号", field: "contactPhone", fieldType: "input" },
	{
		fieldName: "审核状态",
		field: "status",
		fieldType: "select",
		dataSource: [{ label: "全部", value: "" }, ...dataSource],
	},
	{ fieldName: "创建时间", field: "createTime", fieldType: "range-picker" },
];
