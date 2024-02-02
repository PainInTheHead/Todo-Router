import { useParams } from "react-router-dom";
import { selectTodos } from "../../../../utilites/selectors";
import { useAppSelector } from "../../../../hook";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Todo } from "../../../../store/todoSlice";
const TodoDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const todo = useAppSelector(selectTodos).find((todo) => todo._id === Number(id));

  return (
    <>
      <LeftOutlined onClick={() => navigate("/main/todos")} />
      {todo ? (
        <div>
          <div> title: {todo.title}</div>
          <div> id: {todo._id}</div>
        </div>
      ) : (
        <div>Tusk not Found</div>
      )}
    </>
  );
};

export default TodoDetails;
