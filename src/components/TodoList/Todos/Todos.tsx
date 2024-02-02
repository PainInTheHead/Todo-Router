import Todo from "./Todo";
import { PaginationStyled } from "./Todo.styles";
import {
  getFilteredTodos,
  selectTodosFilter,
  totalTodos,
  totalTodosDone,
} from "../../../utilites/selectors";
import { useAppSelector, useAppDispatch } from "../../../hook";
import { TodosWrap, SpinWrapper } from "./Todo.styles";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { getPaginationTodos } from "../../../store/todoSlice";
import { Spin } from "antd";
import { useTrail, animated, config } from "@react-spring/web";
import Lottie from "lottie-react";
import postBtn from "./post.json";

const Todos: React.FC = () => {
  const dispatch = useAppDispatch();
  const filteredTodos = useAppSelector(getFilteredTodos);
  const filterTodo = useAppSelector(selectTodosFilter);
  const doneTodos = useAppSelector((state) => state.todos.totalDone);
  const total = useAppSelector(totalTodos);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 5;
  const [trail, api] = useTrail(filteredTodos.length, () => ({
    opacity: 0,
    x: 20,
    from: { opacity: 0, x: 20 },
    config: config.stiff,
  }));

  // useEffect(() => {
  //   api.start({ opacity: 1, x: 0 });
  // }, [api, filteredTodos]);

  useEffect(() => {
    setLoading(true);
    const fetchTodos = async () => {
      try {
        await dispatch(
          getPaginationTodos({ page: currentPage, filter: filterTodo })
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [total, setCurrentPage, currentPage, dispatch, filterTodo]);

  if (loading || !filteredTodos) {
    return (
      <SpinWrapper>
        <Lottie animationData={postBtn} />
      </SpinWrapper>
    );
  } else {
    api.start({ opacity: 1, x: 0 });
    return (
      <>
        <TodosWrap>
          {trail.map(({ ...style }, index) => (
            <animated.li
              key={filteredTodos[index]._id}
              style={{
                ...style,
              }}
            >
              <Todo {...filteredTodos[index]} />
            </animated.li>
          ))}
        </TodosWrap>
        <PaginationStyled>
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={
              filterTodo === "active"
                ? total - doneTodos
                : filterTodo === "complete"
                ? doneTodos
                : total
            }
            onChange={(page) => {
              setCurrentPage(page);
            }}
          />
        </PaginationStyled>
      </>
    );
  }
  // return (
  //   <>
  //     {loading ? (
  //       <SpinWrapper>

  //         <Lottie animationData={postBtn} />
  //       </SpinWrapper>
  //     ) : (
  //       <TodosWrap>
  //         {trail.map(({ ...style }, index) => (
  //           <animated.li
  //             key={filteredTodos[index]._id}
  //             style={{
  //               ...style,
  //             }}
  //           >
  //             <Todo {...filteredTodos[index]} />
  //           </animated.li>
  //         ))}
  //       </TodosWrap>
  //     )}
  //     <PaginationStyled>
  //       <Pagination
  //         current={currentPage}
  //         pageSize={itemsPerPage}
  //         total={
  //           filterTodo === "active"
  //             ? total - doneTodos
  //             : filterTodo === "complete"
  //             ? doneTodos
  //             : total
  //         }
  //         onChange={(page) => setCurrentPage(page)}
  //       />
  //     </PaginationStyled>
  //   </>
  // );
};

export default Todos;
