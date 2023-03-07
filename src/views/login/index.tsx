import {
  useEffect,
  useRef,
  useState,
  useCallback,
  FC,
  memo,
  useMemo,
} from 'react';
import {
  Modal,
  Form,
  Input,
  Checkbox,
  Button,
  Space,
  Spin,
  Tabs,
  Row,
  Col,
} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import CaptchaCode from 'react-captcha-code';
import { useRequest } from 'ahooks';
import { useSearchParams, useNavigate } from 'react-router-dom';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { useAppSelector, useAppDispatch } from 'store/hooks';
import {
  setLoginInfo,
  setAuthToken,
  setRememberPwd,
  ILoginState,
} from 'store/loginSlice';
import IconLoginBg from 'assets/login-bg.jpg';
import { fetchLogin } from 'api/login';
import { handleError } from 'api/config/errorHandler';

import cx from './style/index.module.less';
type LoginType = 'phone' | 'account';

const Login: FC = () => {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { loginInfo, rememberPwd }: ILoginState = useAppSelector(
    ({ loginState }) => loginState
  );
  const dispatch = useAppDispatch();
  const [rememberPassword, setRememberPassword] =
    useState<boolean>(rememberPwd);
  const [verifyCode, setVerifyCode] = useState<string>('');
  const captchaCodeRef = useRef<any>();
  const [loginType, setLoginType] = useState<LoginType>('account');

  const redirect = useMemo(() => searchParams.get('redirect'), []);

  useEffect(() => {
    if (rememberPwd) {
      const { userCode, password } = loginInfo;
      form.setFieldsValue({ userCode, password });
    }
  }, [loginInfo, rememberPwd, form]);

  const { loading, run } = useRequest(fetchLogin, {
    manual: true,
    onSuccess: async ({ status, data }: any, params: any) => {
      if (status === 200) {
        console.log(data, params);
        dispatch(setAuthToken(data));
        dispatch(setRememberPwd(rememberPassword));
        dispatch(setLoginInfo({ loginInfo: params?.[0] }));
        if (redirect) {
          return window.location.replace(decodeURIComponent(redirect));
        }
        navigate('/');
        // window.location.href =
        // 	process.env.REACT_APP_BUILD_ENV === 'development'
        // 		? '/'
        // 		: process.env.REACT_APP_URL + process.env.PUBLIC_URL;
        // await dispatch(
        //   queryUserInfo({
        //     callback: () => {
        //       if (redirect) {
        //         return window.location.replace(decodeURIComponent(redirect));
        //       }
        //       window.location.href = '/';
        //     }
        //   })
        // );
      }
    },
    onError: (error: any) => {
      handleError(error);
      console.log(error, 'error');
    },
  });

  const onCaptchaCode = useCallback((code: string) => {
    setVerifyCode(code);
  }, []);

  const onSubmitClick = useCallback(async () => {
    const values = await form.validateFields();
    const verificationCode = form.getFieldValue('verificationCode');
    if (verifyCode === verificationCode) {
      console.log(values, 'values');
      run(values);
    } else if (verificationCode) {
      form.setFields([
        {
          name: 'verificationCode',
          value: verificationCode,
          errors: ['验证码输入有误'],
        },
      ]);
      captchaCodeRef.current?.refresh();
    }
  }, [verifyCode, rememberPassword]);

  const onAuth = useCallback(() => {
    Modal.confirm({
      title: '温馨提示',
      content: '请联系「热爱光年」管理员为您处理',
    });
  }, []);
  return (
    <div className={cx['login-container']}>
      <div className={cx['login-bg-wrapper']}>
        <img src={IconLoginBg} />
      </div>
      <div className={cx['form-wrapper']}>
        <div className={cx['form-wrapper__right']}>
          <div className={cx['login-form-title']}>欢迎登录「热爱光年」</div>
          {/* <Tabs
						centered
						activeKey={loginType}
						onChange={(activeKey) => setLoginType(activeKey as LoginType)}
					>
						<Tabs.TabPane key={'account'} tab={'账号密码登录'} />
						<Tabs.TabPane key={'phone'} tab={'手机号登录'} />
					</Tabs> */}
          <Spin spinning={loading}>
            <div className={cx['login-form-wrapper']}>
              <div className={cx['login-form-error-msg']} />
              <Form form={form} className={cx['login-form']} layout="vertical">
                {loginType === 'account' && (
                  <Form.Item noStyle>
                    <Form.Item
                      name="userCode"
                      rules={[{ required: true, message: '账号不能为空' }]}
                    >
                      <Input
                        prefix={<UserOutlined />}
                        placeholder="请输入账号"
                        allowClear
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[{ required: true, message: '密码不能为空' }]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="请输入密码"
                      />
                    </Form.Item>
                    <Form.Item noStyle>
                      <div className={cx['captcha-code-wrapper']}>
                        <Form.Item
                          name="verificationCode"
                          rules={[
                            { required: true, message: '验证码不能为空' },
                          ]}
                        >
                          <Input
                            allowClear
                            placeholder="请输入验证码"
                            onPressEnter={onSubmitClick}
                          />
                        </Form.Item>
                        <CaptchaCode
                          className={cx['captcha-code']}
                          ref={captchaCodeRef}
                          charNum={5}
                          height={36}
                          onChange={onCaptchaCode}
                        />
                      </div>
                    </Form.Item>
                  </Form.Item>
                )}
                {loginType === 'phone' && (
                  <Form.Item>
                    <Form.Item
                      name="phoneNumber"
                      rules={[
                        {
                          required: true,
                          message: '请输入手机号！',
                        },
                        {
                          pattern: /^1\d{10}$/,
                          message: '手机号格式错误！',
                        },
                      ]}
                    >
                      <Input
                        prefix={<UserOutlined />}
                        placeholder="请输入账号"
                        allowClear
                      />
                    </Form.Item>
                    <Row gutter={8}>
                      <Col span={12}>
                        <Form.Item
                          name="verificationCode"
                          noStyle
                          rules={[
                            {
                              required: true,
                              message: '请输入验证码',
                            },
                          ]}
                        >
                          <Input
                            placeholder="请输入验证码"
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Button type="primary" style={{ width: '100%' }}>
                          获取验证码
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                )}
                <Button
                  className={cx['login-form-submit-btn']}
                  type="primary"
                  shape="round"
                  block
                  onClick={onSubmitClick}
                >
                  登录
                </Button>
                <Form.Item>
                  <Space
                    align="center"
                    className={cx['login-form-password-actions']}
                  >
                    <Form.Item
                      name="rememberMe"
                      valuePropName="checked"
                      noStyle
                      className={cx['login-form-remember']}
                    >
                      <Checkbox
                        checked={rememberPassword}
                        onChange={(event: CheckboxChangeEvent) => {
                          setRememberPassword(event.target.checked);
                        }}
                      >
                        记住密码
                      </Checkbox>
                    </Form.Item>
                    <Button type="link">忘记密码</Button>
                  </Space>
                </Form.Item>
              </Form>
            </div>
          </Spin>
          <div className={cx['register-tip']}>
            没有账号，
            <Button type="link" onClick={onAuth}>
              去注册？
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.displayName = 'LoginPage';

export default memo(Login);
