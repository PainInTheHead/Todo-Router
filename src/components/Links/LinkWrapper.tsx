import { NavLink, Link, Outlet } from "react-router-dom";
import { Container } from "./LinkWrapper.styles";
import { Button } from "antd";
import { resetState } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../../store/todoSlice";
import { useAppSelector, useAppDispatch } from "../../hook";
import { selectTodos, selectUser } from "../../utilites/selectors";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import Lottie from "lottie-react";
import animationData from "./Animation - 1706702735032.json";

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const signOut = () => {
    localStorage.clear();
    dispatch(resetState());
    dispatch(logOutUser());
    navigate("/");
  };
  const user = useAppSelector(selectUser);
  const { avatar } = user;

  return (
    <Container>
      <header>
        {/* <Button
          style={{ color: "gray" }}
          className="link-btn"
          onClick={() => signOut()}
          type="link"
        >
          Sign out
        </Button> */}
        <button className="link-btn" onClick={() => signOut()}>
          <Lottie animationData={animationData} />
        </button>
        <NavLink to="/main/todos">My Todo</NavLink>
        <button
          className="avatar-btn"
          onClick={() => navigate("/main/profile")}
        >
          <Avatar
            size={50}
            icon={avatar ? <img src={avatar} alt="AVA" /> : <UserOutlined />}
          />
        </button>
      </header>
      <main>
        <Outlet />
      </main>

      <footer>2023</footer>
    </Container>
  );
};

export default Layout;
