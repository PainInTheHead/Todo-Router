import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { FormWrapper } from "./Form.styles";
import { addTodo, allSelect } from "../../../store/todoSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form: React.FC = () => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  // const userId = useAppSelector(selectUserId)

  const submitFormHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!value) {
      toast.error('Невозможно добавить пустую задачу', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
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
          <img src="./select.png" alt="select" />
        </button>
        <input
          className="form-input"
          type="text"
          placeholder="your todo..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="btn-input-icon">
          <img src="./add.png" alt="add"></img>
        </button>
      </div>
    </FormWrapper>
    <ToastContainer />
    </>
  );
};

export default Form;