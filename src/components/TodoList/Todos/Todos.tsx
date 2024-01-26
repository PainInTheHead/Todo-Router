import Todo from "./Todo";
import { getFilteredTodos } from "../../../utilites/selectors";
import { useAppSelector } from "../../../hook";
import { TodosWrap } from "./Todo.styles";
import { Pagination } from "antd";
import { useState } from "react";

const Todos: React.FC = () => {
  const filteredTodos = useAppSelector(getFilteredTodos);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  return (
    <TodosWrap className="todos">
      {filteredTodos
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
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
        total={filteredTodos.length}
        onChange={(page) => setCurrentPage(page)}
      />
    </TodosWrap>
  );
};

export default Todos;
