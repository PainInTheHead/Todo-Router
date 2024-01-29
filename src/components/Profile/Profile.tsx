import React from "react";
import { Container} from "./Profile.styled";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useAppSelector, useAppDispatch } from "../../hook";
import { selectTodos, selectUser } from "../../utilites/selectors";
import { Button, Input, Space, Form } from "antd";
import { changeAvatar, getUser } from "../../store/userSlice";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { toastErrorImage } from "../../utilites/tosters";

type FieldType = {
  avatar?: string;
};

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);
  const activedTodos = todos.filter((todo) => !todo.done).length;
  const completedTodos = todos.length - activedTodos;
  const allTodos = todos.length;
  const user = useAppSelector(selectUser);
  const { email, password, id, avatar } = user;
  const [formAva, setFormAva] = useState(false);

  const onFinish = async (values: any) => {
    try {
      const response = await dispatch(
        changeAvatar({ avatar: values.avatar, id: user.id })
      );
      if (response.payload.message !== "Avatar changed") {
        return;
      }
    } catch (error) {
      toastErrorImage();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    toastErrorImage();
  };

  return (
    <Container>
      <div className="aboutUser">
        <div className="avatar">
          <Avatar
            size={200}
            icon={avatar ? <img src={avatar} alt="AVA" /> : <UserOutlined />}
          />
          <Button
            style={{ width: "200px" }}
            onClick={() => setFormAva(!formAva)}
          >
            New avatar
          </Button>

          {formAva && (
            <Form
              name="basic"
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Space.Compact style={{ width: "200px" }}>
                <Form.Item<FieldType> name="avatar">
                  <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Space.Compact>
            </Form>
          )}
        </div>
      </div>
      <div className="info">
        <ul>
          <li>your email: {email}</li>
          <li>your pass: {password}</li>
          <li>your id: {id}</li>
        </ul>
      </div>
      <div className="aboutTodos">
        <ul>
          <li>all todos: {allTodos}</li>
          <li>all complited: {completedTodos}</li>
          <li>all active: {activedTodos}</li>
        </ul>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default Profile;
