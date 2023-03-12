import Components from 'components/index';
import { formFieldList, getColumns } from './constants';
import { usePageTable } from 'hooks/usePageTable';
import { useModalConfirm } from 'hooks/useModalConfirm';

import { fetchQueryActivityList } from 'api/index';

const ActivityAudit = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { pagination, loading, tableList, setTableList, initialValues, handleSearch, handlePageChange, handleAction } =
		usePageTable({
			fetchApi: fetchQueryActivityList,
			state: { status: '', createTime: [], contactPhone: '', communityName: '', circleCategoryId: '', circleId: '' },
		});
	const { modalConfirm } = useModalConfirm();
	const [applyVisible, setApplyVisible] = useState<boolean>(false);
	const columns: any = useMemo(
		() =>
			getColumns(async (record: any, actionType: string) => {
				switch (actionType) {
					case 'status':
						setApplyVisible(true);
						// const applyStatus = '';
						// modalConfirm({ content: applyStatus }, () => {});
						break;
					case 'edit':
						navigate(`/container/community-create?communityId=${record.id}`);
						break;
					case 'view':
						navigate(`/container/community-detail?communityId=${record.id}`);
						break;
					default:
						break;
				}
			}),
		[tableList]
	);
	return (
		<Components.PageContainer
			formFieldList={formFieldList}
			loading={loading}
			dataSource={[{ communityName: 'communityName', communityDesc: '崂山可乐打瞌睡了付款了洛克菲勒看到了反馈来看我开了房' }]}
			columns={columns}
			pagination={pagination}
			onSearch={handleSearch}
			onPageChange={handlePageChange}
			initialValues={initialValues}
			createPathname="/manage/activity-create"
		/>
	);
};
export default ActivityAudit;
