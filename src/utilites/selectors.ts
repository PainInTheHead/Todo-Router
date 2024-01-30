import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectTodos = (state: RootState) => state.todos.todos;
export const selectTodosFilter = (state: RootState) => state.todos.filter;
export const totalTodos = (state: RootState) => state.todos.total;
export const totalTodosDone = (state: RootState) => state.todos.totalDone;

export const getFilteredTodos = createSelector(
  [selectTodos, selectTodosFilter],
  (todos, filter) => {
    if (filter === "all") {
      return todos;
    } else if (filter === "active") {
      return todos.filter((todo) => !todo.done);
    } else {
      return todos.filter((todo) => todo.done);
    }
  }
);

export const selectUser = (state: RootState) => state.user.user;
