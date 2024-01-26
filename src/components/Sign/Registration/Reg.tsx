import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import { authorization } from "../../../store/userSlice";
import { useAppDispatch } from "../../../hook";
import { registration } from "../../../store/userSlice";

const Reg: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    localStorage.clear();
    const name = values.username;
    const pass = values.password;
    if (name && pass) {
      const response = await dispatch(registration({ email: name, password: pass }));
      if (response.payload.email === name) {
        alert('Вы зарегистрировались :)')
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
          rules={[{ required: true, message: "Please input your email!", min: 4, max: 10, type: "email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!", min: 8, max: 10}]}
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
            Registration
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Reg;
