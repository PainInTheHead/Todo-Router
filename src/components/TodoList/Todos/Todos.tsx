import Todo from "./Todo";
import {
  getFilteredTodos,
  selectTodosFilter,
  totalTodos,
  totalTodosDone,
} from "../../../utilites/selectors";
import { useAppSelector, useAppDispatch } from "../../../hook";
import { TodosWrap } from "./Todo.styles";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { getPaginationTodos } from "../../../store/todoSlice";

const Todos: React.FC = () => {
  const dispatch = useAppDispatch();
  const filteredTodos = useAppSelector(getFilteredTodos);
  const filterTodo = useAppSelector(selectTodosFilter);
  const doneTodos = useAppSelector(totalTodosDone);
  const total = useAppSelector(totalTodos);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  useEffect(() => {
    const fetchTodos = async () => {
      await dispatch(
        getPaginationTodos({ page: currentPage, filter: filterTodo })
      );
    };
    fetchTodos();
  }, [currentPage, setCurrentPage, dispatch, total, filterTodo]);

  return (
    <TodosWrap className="todos">
      {filteredTodos
        // .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .slice(0, 4)
        .map((todo) => {
          return <Todo key={todo._id} {...todo} />;
        })}
      {/* {filteredTodos.map((todo) => {
        return <Todo key={todo._id} {...todo} />;
      })} */}
      <Pagination
        className="pagination"
        current={currentPage}
        pageSize={itemsPerPage}
        total={
          filterTodo === "active"
            ? total - doneTodos
            : filterTodo === "complete"
            ? doneTodos
            : total
        }
        onChange={(page) => setCurrentPage(page)}
      />
    </TodosWrap>
  );
};

export default Todos;
