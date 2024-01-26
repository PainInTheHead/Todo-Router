import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (user.email) {
  //     setIsLoading(false);
  //     dispatch(getUser());
  //     dispatch(getTodos());
  //   } else {
  //     setIsLoading(true);
  //   }
  // }, [dispatch, user]);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(getUser());
        if (user.email) {
          setIsLoading(false);
          dispatch(getTodos());
        } else {
          setIsLoading(true)
        };
      } catch (error) {
        console.error(error);
      }
    };
    checkAuth();
  }, [dispatch, user]);

  // useEffect(() => {
  //   // dispatch(getUser());
  // }, [dispatch, user]);

  // if (isLoading) {
  //   return (
  //     <>
  //       <Routes>
  //         {/* <Route path="/" element={<Layout />}> */}
  //           <Route index element={<SignPage />} />
  //         {/* </Route> */}
  //       </Routes>
  //     </>
  //   );
  // }

  return isLoading ? (
    <>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
        <Route index element={<SignPage />} />
        {/* </Route> */}
      </Routes>
    </>
  ) : (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="todos" element={<TodoList />} />
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
