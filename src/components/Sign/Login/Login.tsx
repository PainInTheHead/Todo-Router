import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Input } from "antd";
import { authorization, updateUser } from "../../../store/userSlice";
import { useAppDispatch } from "../../../hook";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import {
  toastSuccesReg,
  toastErrorAuntificate,
  toastErrorHolder,
} from "../../../utilites/tosters";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    remember: false,
  };

  const onSubmit = async (values: any) => {
    localStorage.clear();
    const name = values.email;
    const pass = values.password;
    if (!(name && pass)) {
      return toastErrorHolder();
    }
    try {
      const response = await dispatch(
        authorization({ email: name, password: pass })
      );
      if (response.payload.token) {
        dispatch(
          updateUser({
            email: name,
            password: pass,
            id: response.payload.id,
            avatar: response.payload.avatar,
          })
        );
        localStorage.setItem("token", response.payload.token);
        navigate("/main/todos");
      }
    } catch (error) {
      toastErrorAuntificate();
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Please enter your email"),
    // .email("Please enter a valid email address"),
    // .matches(
    //   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    //   "Please enter a valid email address"
    // ),
    password: Yup.string().required("Please enter your password"),
    // .min(8, "Password must be at least 8 characters long"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form name="basic" autoComplete="on">
            <div className="email">
              <label htmlFor="email">Email:</label>
              <Field
                label="Email"
                // type="email"
                id="email"
                name="email"
                as={Input}
                placeholder="Enter your email"
              />
              <ErrorMessage
                className="error-form"
                name="email"
                component="div"
              />
            </div>
            <div className="password">
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                id="password"
                name="password"
                as={Input.Password}
                placeholder="Enter your password"
              />
              <ErrorMessage
                className="error-form"
                name="password"
                component="div"
              />
            </div>

            <div className="remember">
              <Field
                type="checkbox"
                id="remember"
                name="remember"
                value="remember"
                as={Checkbox}
                checked={values.remember}
                style={{ marginRight: "10px" }}
              />
              <label htmlFor="remember">Remember me</label>
            </div>

            <div>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
};

export default Login;
