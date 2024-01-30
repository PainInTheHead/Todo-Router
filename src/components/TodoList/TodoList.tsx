import React from "react";
import { useEffect } from "react";
import Form from "./Form/Form";
import CounterTodos from "./Counter/CounterTodos";
import Todos from "./Todos/Todos";
import Buttons from "./Buttons/Buttons";
import { useAppDispatch, useAppSelector } from "../../hook";
import { getTodos } from "../../store/todoSlice";
import { selectTodos, totalTodos } from "../../utilites/selectors";
import { Container } from "./Todolist.styles";

const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const total = useAppSelector(totalTodos);
  // useEffect(() => {
  //   dispatch(getTodos());
  // }, [dispatch, total]);

  return (
    <Container>
      <h1 className="title">Todos</h1>
      <Form />
      <CounterTodos />
      {total !== 0 && <Buttons />}
      <Todos />
    </Container>
  );
};

export default TodoList;
