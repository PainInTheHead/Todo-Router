import { Routes, Route } from "react-router-dom";
import Layout from "../components/Links/LinkWrapper";
import TodoList from "../components/TodoList/TodoList";
import SignPage from "../components/Sign/SignPage";
import { GlobalStyle } from "../components/Links/LinkWrapper.styles";
import Profile from "../components/Profile/Profile";
import { useAppDispatch, useAppSelector } from "../hook";
import { getUser, getMe } from "../store/userSlice";
import { getTodos } from "../store/todoSlice";
import { useEffect, useState } from "react";
import { selectUser } from "../utilites/selectors";
import RequireAuth from "../components/Profile/HOK/RequireAuth";
import TodoDetails from "../components/TodoList/Todos/TodoDetails/TodoDetails";
import { Spin } from "antd";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(getUser());
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [dispatch, user]);

  return isLoading ? (
    <div className="Spin">
      <GlobalStyle />
      <Spin size="large">
        <div className="content" />
      </Spin>
    </div>
  ) : (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<SignPage />} />
        <Route path="/main/" element={<Layout />}>
          <Route
            path="todos"
            element={
              <RequireAuth>
                <TodoList />
              </RequireAuth>
            }
          />
          <Route path="todos/:id" element={<TodoDetails />} />
          <Route
            path="profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
