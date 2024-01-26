import { getMe } from "../../../store/userSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { selectUser } from "../../../utilites/selectors";
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const user = useAppSelector(selectUser)
  const {email, password} = user
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true)

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await dispatch(getMe());
  //       console.log(response.payload)
  //       if (!response.payload) {
  //         navigate("/", { replace: true, state: { from: location } });
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setIsLoading(false); 
  //     }
  //   };
  //   checkAuth();
  // }, [navigate, location]);


  
  
  // if (isLoading) {
    //   return null;
    // }

    
    if (!email) {
    return <Navigate to="/" state={{ from: location }} replace />
    }

  return children;
};

export default RequireAuth;

  // useEffect(() => {
  //   if (!isActive) {
  //     navigate('/', { replace: true, state: { from: location } });
  //   }
  // }, [isActive, navigate, location]);



          // user.active = response.payload;
          // // if (user.active) {
          // //   return <Navigate to="/" state={{ from: location }} replace />;
          // // }