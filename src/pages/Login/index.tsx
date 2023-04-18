import {Button, Form, Input} from 'antd';
import '../../reset.less'
import './style.less'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import {fetchLogin} from '../../api/Login';

const Login: React.FC = () => {
    const navigate = useNavigate()

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        const loginData = {
            userName: values.userName,
            password: values.password
        }
        requestLogin(loginData)
    };

    const requestLogin = async (data: object) => {
        const res = await fetchLogin(data)
        console.log(res)
        localStorage.setItem('Authorization', res.accessToken)
        navigate('/home')
    }

    return <div className='login-back'>
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="userName"
                rules={[{ required: true, message: '请输入用户名!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="密码"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                </Button>
            </Form.Item>
        </Form>
    </div>;
};

export default Login;
