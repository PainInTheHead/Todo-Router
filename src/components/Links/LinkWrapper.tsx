import { Link, Outlet } from "react-router-dom";
import { Container } from "./LinkWrapper.styles";
import { Button } from "antd";
import { selectUser } from "../../utilites/selectors";
import { useAppDispatch, useAppSelector } from "../../hook";
import { resetState } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../../store/todoSlice";


const Layout = () => {
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const signOut = () => {
    localStorage.clear()
    dispatch(resetState())
    dispatch(logOutUser())
    navigate("/")
    }
  
  return (
    <Container>
      <header>
        {/* <Link to="/">Sign</Link> */}
        <Button onClick={() => signOut()} type="link">Sign out</Button>
        <Link to="/todos">My Todo</Link>
        <Link to="/profile">profile</Link>
      </header>
      <main>
        <Outlet />
      </main>

      <footer>2023</footer>
    </Container>
  );
};

export default Layout;
