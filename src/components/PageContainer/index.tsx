import { FC, ReactNode, Fragment } from "react";
import { Table, Card, PaginationProps, Button, Col, Row, Space, Form, DatePicker, Typography, Select, Input } from "antd";
import { SearchOutlined, PlusOutlined, RedoOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

import { isEmpty, map } from "lodash";

import { useAppSelector, useAppDispatch } from "store/hooks";

import cx from "./index.module.less";

const { Title } = Typography;

const { useForm } = Form;
const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;

interface IFormField {
	fieldName: string;
	field: string;
	fieldType: "input" | "select" | "range-picker" | "range-select";
	valueKey?: string;
	valueLabel?: string;
	dataSource: any[];
	[key: string]: any;
}

interface IProps {
	formFieldList: IFormField[];
	createPathname?: string;
	colSpan: number;
	initialValues: { [key: string]: any };
	dataSource: any;
	columns: any;
	loading: boolean;
	pagination: PaginationProps;
	showCreateBtn: boolean;
	onSearch: (values: Record<string, any>) => void;
	onPageChange: (values: PaginationProps) => void;
}
const defaultProps = {
	loading: false,
	dataSource: [],
	columns: [],
	colSpan: 8,
	showCreateBtn: true,
	formFieldList: [],
	onSearch: (value) => {},
	onPageChange: (value) => {},
	initialValues: {},
	pagination: {},
} as IProps;

const PageContainer: FC<Partial<IProps>> = (props) => {
	const {
		loading,
		onSearch,
		onPageChange,
		pagination,
		createPathname,
		dataSource,
		columns,
		formFieldList,
		initialValues,
		colSpan,
		showCreateBtn,
	} = { ...defaultProps, ...props };

	const [form] = useForm();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const handleSubmit = useCallback(() => {
		const values = form.getFieldsValue();
		onSearch(values);
	}, [form]);

	const handleReset = useCallback(() => {
		form.resetFields();
		const values = form.getFieldsValue();
		console.log(values,'values')
		onSearch(values);
	}, [form]);

	const handleCreate = useCallback(() => {
		if (createPathname) navigate(createPathname);
	}, [navigate, createPathname]);

	const rangePresets: {
		label: string;
		value: [Dayjs, Dayjs];
	}[] = [
		{ label: "近7天", value: [dayjs().add(-7, "d"), dayjs()] },
		{ label: "近15天", value: [dayjs().add(-14, "d"), dayjs()] },
		{ label: "近30天", value: [dayjs().add(-30, "d"), dayjs()] },
		{ label: "近三个月", value: [dayjs().add(-90, "d"), dayjs()] },
	];
	const renderForm = useMemo(() => {
		return map(formFieldList, (item: IFormField) => {
			let { fieldName, field, dataSource = [], valueLabel = "label", valueKey = "value", mode = "" } = item;
			switch (item.fieldType) {
				case "input":
					return (
						<Col span={colSpan}>
							<FormItem label={fieldName} name={field}>
								<Input allowClear placeholder={`请输入${fieldName}`} onPressEnter={handleSubmit} />
							</FormItem>
						</Col>
					);
				case "select":
					return (
						<Col span={colSpan}>
							<FormItem label={fieldName} name={field}>
								<Select
									placeholder={`请选择${fieldName}`}
									options={map(dataSource, (selector) =>
										Object.assign({}, selector, {
											label: selector[valueLabel],
											value: selector[valueKey],
										})
									)}
									mode={mode}
									allowClear
								/>
							</FormItem>
						</Col>
					);
				case "range-picker":
					return (
						<Col span={colSpan}>
							<FormItem label={fieldName} name={field}>
								<RangePicker
									allowClear
									style={{ width: "100%" }}
									disabledDate={(date) => dayjs(date).isAfter(dayjs())}
									format="YYYY-MM-DD HH:mm:ss"
									showTime
									presets={rangePresets}
								/>
							</FormItem>
						</Col>
					);
				default:
					break;
			}
		});
	}, [formFieldList, colSpan]);

	return (
		<Fragment>
			<Card className={cx["search-content"]}>
				<div className={cx["search-form-wrapper"]}>
					<Form
						form={form}
						className={cx["search-form"]}
						labelAlign="left"
						initialValues={initialValues}
						labelCol={{ span: 5 }}
						wrapperCol={{ span: 19 }}
					>
						<Row gutter={24}>{renderForm}</Row>
					</Form>
					<div className={cx["search-form-right-button"]}>
						<Button type="primary" loading={loading} icon={<SearchOutlined />} onClick={handleSubmit}>
							搜索
						</Button>
						<Button icon={<RedoOutlined />} onClick={handleReset}>
							重置
						</Button>
					</div>
				</div>
			</Card>
			<Card>
				{showCreateBtn && (
					<div className={cx["button-group"]}>
						<Space>
							<Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
								新建
							</Button>
						</Space>
					</div>
				)}
				<Table
					loading={loading}
					onChange={onPageChange}
					scroll={{ x: true }}
					sticky
					pagination={Object.assign(
						{
							sizeCanChange: true,
							showTotal: (total: number) => `共 ${total} 条`,
							total: 0,
							pageSize: 20,
							sizeOptions: [20, 50, 100, 150, 200],
							pageSizeChangeResetCurrent: true,
						},
						pagination
					)}
					columns={columns}
					dataSource={dataSource}
				/>
			</Card>
		</Fragment>
	);
};

export default memo(PageContainer);
