import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { FormWrapper } from "./Form.styles";
import { addTodo, allSelect } from "../../../store/todoSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastErrorTusk } from "../../../utilites/tosters";
import Lottie from "lottie-react";
import selectAllAnime from "./Animation - 1706702081453.json";
import loadingAnime from "./loading.json";

const Form: React.FC = () => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  const submitFormHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!value) {
      toastErrorTusk();
    }
    dispatch(addTodo({ title: value }));
    setValue("");
  };

  return (
    <>
      <FormWrapper className="form" onSubmit={submitFormHandler}>
        <div className="input-con">
          <button
            className="btn-input-icon"
            type="button"
            onClick={() => {
              dispatch(allSelect());
            }}
          >
            {/* <img src="/select.png" alt="select" /> */}
            <Lottie animationData={selectAllAnime} />
          </button>

          <input
            className="form-input"
            type="text"
            placeholder="your todo..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit" className="btn-input-icon">
            {/* <img src="/add.png" alt="add"></img> */}
            <Lottie animationData={loadingAnime} />
          </button>
        </div>
      </FormWrapper>
      <ToastContainer />
    </>
  );
};

export default Form;
