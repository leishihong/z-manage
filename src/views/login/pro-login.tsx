import {
	AlipayCircleOutlined,
	LockOutlined,
	MobileOutlined,
	TaobaoCircleOutlined,
	UserOutlined,
	WeiboCircleOutlined
} from '@ant-design/icons';
import {
	LoginForm,
	ProFormCaptcha,
	ProFormCheckbox,
	ProFormText,
	ProConfigProvider
} from '@ant-design/pro-components';
import { message, Space, Tabs, Button, Modal } from 'antd';
import type { CSSProperties } from 'react';
import { useState, useCallback } from 'react';
import IconLoginBg from 'assets/login-bg.jpg';

type LoginType = 'phone' | 'account';

const iconStyles: CSSProperties = {
	marginInlineStart: '16px',
	color: 'rgba(0, 0, 0, 0.2)',
	fontSize: '24px',
	verticalAlign: 'middle',
	cursor: 'pointer'
};

export default () => {
	const [loginType, setLoginType] = useState<LoginType>('account');
	const onAuth = useCallback(() => {
		Modal.confirm({
			title: '温馨提示',
			content: '请联系「热爱光年」管理员为您处理'
		});
	}, []);
	return (
		<ProConfigProvider hashed={false} componentSize="large">
			<div style={{ background: '#f9f9f9' }}>
				{/* <div className="login-bg-wrapper">
					<img src={IconLoginBg} />
				</div> */}
				<LoginForm
					logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
					title="热爱光年"
					subTitle="全球最大的代码托管平台"
					actions={
						<div style={{ textAlign: 'center' }}>
							<div className="register-tip">
								没有账号，
								<a onClick={onAuth}>去注册？</a>
							</div>
						</div>
					}
				>
					<Tabs
						centered
						activeKey={loginType}
						onChange={(activeKey) => setLoginType(activeKey as LoginType)}
					>
						<Tabs.TabPane key={'account'} tab={'账号密码登录'} />
						<Tabs.TabPane key={'phone'} tab={'手机号登录'} />
					</Tabs>
					{loginType === 'account' && (
						<>
							<ProFormText
								name="userCode"
								fieldProps={{
									prefix: <UserOutlined className={'prefixIcon'} />
								}}
								placeholder="请输入用户名"
								rules={[
									{
										required: true,
										message: '请输入用户名!'
									}
								]}
							/>
							<ProFormText.Password
								name="password"
								fieldProps={{
									prefix: <LockOutlined className={'prefixIcon'} />
								}}
								placeholder="请输入密码"
								rules={[
									{
										required: true,
										message: '请输入密码！'
									}
								]}
							/>
						</>
					)}
					{loginType === 'phone' && (
						<>
							<ProFormText
								fieldProps={{
									prefix: <MobileOutlined className={'prefixIcon'} />
								}}
								name="mobile"
								placeholder={'手机号'}
								rules={[
									{
										required: true,
										message: '请输入手机号！'
									},
									{
										pattern: /^1\d{10}$/,
										message: '手机号格式错误！'
									}
								]}
							/>
							<ProFormCaptcha
								fieldProps={{
									prefix: <LockOutlined className={'prefixIcon'} />
								}}
								placeholder={'请输入验证码'}
								captchaTextRender={(timing: boolean, count: number) => {
									if (timing) {
										return `${count} ${'获取验证码'}`;
									}
									return '获取验证码';
								}}
								name="captcha"
								rules={[
									{
										required: true,
										message: '请输入验证码！'
									}
								]}
								onGetCaptcha={async () => {
									message.success('获取验证码成功！验证码为：1234');
								}}
							/>
						</>
					)}
					<div
						style={{
							marginBlockEnd: 24
						}}
					>
						<ProFormCheckbox noStyle name="rememberMe">
							自动登录
						</ProFormCheckbox>
						<a
							style={{
								float: 'right'
							}}
						>
							忘记密码
						</a>
					</div>
				</LoginForm>
			</div>
		</ProConfigProvider>
	);
};
