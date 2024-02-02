import {
  openFiltered,
  clearAllTodo,
  clearComplited,
} from "../../../store/todoSlice";
import { useAppDispatch } from "../../../hook";
import { Button } from "antd";

import { NavButtonWrapper } from "./Butons.styles";

const Buttons: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <NavButtonWrapper>
      <Button type="primary" onClick={() => dispatch(clearAllTodo())}>
        Clear All
      </Button>
      <Button type="primary" onClick={() => dispatch(openFiltered("all"))}>
        All
      </Button>
      <Button type="primary" onClick={() => dispatch(openFiltered("active"))}>
        Active
      </Button>
      <Button type="primary" onClick={() => dispatch(openFiltered("complete"))}>
        Completed
      </Button>
      <Button type="primary" onClick={() => dispatch(clearComplited())}>
        Clear complited
      </Button>
    </NavButtonWrapper>
  );
};

export default Buttons;
