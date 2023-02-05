import React, {
  FC,
  memo,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { PaginationProps, message } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRequest } from "ahooks";

import { IResponseData } from "api/type";

import { useModalConfirm } from "hooks/useModalConfirm";

interface IProps {
  fetchApi: any;
  fetchStatusApi?: any;
  fetchDeleteApi?: any;
  state: { [key: string]: any };
}

export const useArcoTable = ({
  fetchApi,
  state,
  fetchStatusApi,
  fetchDeleteApi,
}: IProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { modalConfirm } = useModalConfirm();
  const [tableList, setTableList] = useState<any[]>([]);
  const [pagination, setPatination] = useState<PaginationProps>({
    total: 0,
    pageSize: 20,
    current: 1,
  });
  const [initialValues, setInitialValues] = useState<{ [key: string]: any }>(
    state
  );

  const { loading, run: queryTableList } = useRequest(fetchApi, {
    manual: true,
    onSuccess: ({ status, data }: IResponseData) => {
      if (status === 200) {
        const { records = [], total = 0 } = data;
        setTableList(records);
        setPatination((preState) => Object.assign({}, preState, { total }));
      }
    },
  });

  useEffect(() => {
    queryTableList({
      currPage: pagination.current,
      pageSize: pagination.pageSize,
      ...initialValues,
    });
  }, []);

  const handleSearch = useCallback(
    (value: any) => {
      const [startTime = "", endTime = ""] = value.createTime ?? [];
      setPatination((preState) => Object.assign({}, preState, { current: 1 }));
      setInitialValues((preState: any) =>
        Object.assign({}, preState, { ...value, startTime, endTime })
      );
      queryTableList({
        currPage: 1,
        pageSize: pagination.pageSize,
        endTime,
        startTime,
        ...value,
      });
    },
    [pagination, queryTableList]
  );

  const handlePageChange = useCallback(
    ({ current, pageSize }: PaginationProps) => {
      setPatination((preState) =>
        Object.assign({}, preState, { current, pageSize })
      );
      queryTableList({
        currPage: current,
        pageSize,
        ...initialValues,
      });
    },
    [initialValues, queryTableList]
  );

  const handleAction = useCallback(
    async (record: any, actionType: string, pathname?: string) => {
      const statusText = record.status ? "启用" : "禁用";
      switch (actionType) {
        case "view":
          if (pathname) navigate(pathname);
          break;
        case "edit":
          if (pathname) navigate(pathname);
          break;
        case "status":
          modalConfirm(
            { content: `确定${statusText}吗？` },
            async (callback) => {
              try {
                const params = { status: record.status ? 0 : 1, id: record.id };
                const { status } = await fetchStatusApi(params);
                if (status === 200) {
                  const findInd = tableList.findIndex(
                    (item) => item.id === record.id
                  );
                  if (findInd > -1) {
                    setTableList((preState) => {
                      preState[findInd].status = record.status ? 0 : 1;
                      return [...preState];
                    });
                  }
                  callback("success");
                  message.success(`${statusText}成功`);
                } else {
                  callback("failed");
                }
              } catch (error) {
                callback("failed");
              }
            }
          );
          break;
        case "delete":
          modalConfirm(
            { content: "删除后不可恢复，确定删除？" },
            async (callback) => {
              try {
                const params = { id: record.id };
                const { status } = await fetchDeleteApi(params);
                if (status === 200) {
                  const findInd = tableList.findIndex(
                    (item) => item.id === record.id
                  );
                  if (findInd > -1) {
                    setTableList((preState) => {
                      preState.splice(findInd, 1);
                      return [...preState];
                    });
                  }
                  callback("success");
                  message.success("删除成功");
                } else {
                  callback("failed");
                }
              } catch (error) {
                callback("failed");
              }
            }
          );
          break;
        default:
          break;
      }
      console.log(`output->record`, record);
    },
    [tableList]
  );

  return {
    loading,
    tableList,
    setTableList,
    queryTableList,
    pagination,
    setPatination,
    initialValues,
    setInitialValues,
    handleSearch,
    handlePageChange,
    handleAction,
  };
};
