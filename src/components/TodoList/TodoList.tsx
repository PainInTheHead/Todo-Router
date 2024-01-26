import React from "react";
import { useEffect } from "react";
import Form from "./Form/Form";
import CounterTodos from "./Counter/CounterTodos";
import Todos from "./Todos/Todos";
import Buttons from "./Buttons/Buttons";
import { useAppDispatch, useAppSelector } from "../../hook";
import { getTodos } from "../../store/todoSlice";
import { selectTodos } from "../../utilites/selectors";
import { Container } from "./Todolist.styles";

const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
 
  const todos = useAppSelector(selectTodos);

  return (
    <Container>
      <h1 className="title">Todos</h1>
      <Form />
      <CounterTodos />
      {todos.length !== 0 && <Buttons />}
      <Todos />
    </Container>
  );
};

export default TodoList;
