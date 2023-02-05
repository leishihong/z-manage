import {
  useContext,
  useState,
  useEffect,
  Fragment,
  FC,
  memo,
  useCallback,
} from "react";
import { Tooltip, Input, Avatar, Modal, Dropdown } from "antd";
import type { MenuProps } from "antd";
import {
  BellOutlined,
  SettingOutlined,
  PoweroffOutlined,
  FullscreenOutlined,
  ExpandOutlined,
  CompressOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useFullscreen, useRequest } from "ahooks";

import { useAppSelector, useAppDispatch } from "store/hooks";
import { GlobalState, updateRouterPrompt } from "store/globalSlice";
import { handleLogout } from "store/loginSlice/actions";

// import Logo from '@/assets/logo.svg';
import IconButton from "./IconButton";

import styles from "../style/index.module.less";

const Navbar: FC = () => {
  const { userInfo, userLoading } = useAppSelector(
    ({ globalState }) => globalState
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body);

  const handleClickLogout = useCallback(() => {
    dispatch(
      handleLogout({
        callback: async () => {
          await dispatch(updateRouterPrompt({ routerPrompt: true }));
          navigate("/login");
        },
      })
    );
  }, []);

  const menuItemList: MenuProps["items"] = [
    {
      label: (
        <Fragment>
          <SettingOutlined className={styles["dropdown-icon"]} />
          用户设置
        </Fragment>
      ),
      key: "setting",
    },
    {
      label: (
        <Fragment>
          <PoweroffOutlined className={styles["dropdown-icon"]} />
          用户设置
        </Fragment>
      ),
      key: "logout",
    },
  ];
  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    console.log("click", key);
    if (key === "logout") {
      Modal.confirm({
        title: "温馨提示",
        content: "您确定要退出登录吗？",
        onOk: handleClickLogout,
      });
    }
  };

  return (
    <Fragment>
      <div className={styles.navbar}>
        <div className={styles.left}>
          <div className={styles.logo}>
            {/* <Logo /> */}
            <div className={styles["logo-name"]}>热爱光年</div>
          </div>
        </div>
        <ul className={styles.right}>
          <li>
            <Input.Search className={styles.round} placeholder="输入内容查询" />
          </li>
          <li>
            <Tooltip title={isFullscreen ? "退出全屏" : "全屏"}>
              <IconButton
                onClick={toggleFullscreen}
                icon={
                  isFullscreen ? <FullscreenOutlined /> : <CompressOutlined />
                }
              />
            </Tooltip>
          </li>
          {userInfo && (
            <li>
              <Dropdown
                menu={{ items: menuItemList, onClick: handleMenuClick }}
                placement="bottomRight"
                disabled={userLoading}
              >
                <Avatar size={32} style={{ cursor: "pointer" }}>
                  {userLoading ? (
                    <LoadingOutlined />
                  ) : (
                    <img alt="avatar" src={userInfo.avatar} />
                  )}
                </Avatar>
              </Dropdown>
            </li>
          )}
        </ul>
      </div>
    </Fragment>
  );
};

export default memo(Navbar);
