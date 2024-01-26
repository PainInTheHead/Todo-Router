import { Link, useNavigate } from "react-router-dom";
import { Container } from "./../Sign.styled";
import { Button, Checkbox, Form, Input } from "antd";
import { authorization, updateUser } from "../../../store/userSlice";
import { useAppDispatch } from "../../../hook";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  
  const onFinish = async (values: any) => {
    localStorage.clear();
  const name = values.username;
  const pass = values.password;
  if (name && pass) {
    try {
      const response = await dispatch(authorization({ email: name, password: pass }));
      if (response.payload.token) {
        dispatch(updateUser({email: name, password: pass, id: response.payload.id, avatar: response.payload.avatar}))
        localStorage.setItem("token", response.payload.token);
        navigate("/todos");
      }
    } catch (error) {
      // обработка ошибки, если она есть
    }
  }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!"}]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
