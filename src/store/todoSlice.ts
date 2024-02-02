import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  isAnyOf,
} from "@reduxjs/toolkit";
import axios from "./../api/index";
// const token = localStorage.getItem("token");
// axios.defaults.headers.common["Authorization"] = token;

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  const response = await axios.get("todos/todo");
  return response.data;
});

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (payload: { title: string }) => {
    const response = await axios.post("todos/todo", {
      title: payload.title,
    });
    return response.data;
  }
);

export const deletedTodo = createAsyncThunk(
  "todos/deletedTodo",
  async (_id: number) => {
    const response = await axios.delete(`todos/todo/${_id}`);
    return response.data;
  }
);

export const clearAllTodo = createAsyncThunk("clearAllTodo", async () => {
  const response = await axios.delete(`todos/clearholder`);
  return response.data;
});
export const clearComplited = createAsyncThunk("clearComplited", async () => {
  const response = await axios.delete(`todos/clearComplited`);
  return response.data;
});

export const setDoneTodo = createAsyncThunk(
  "todos/setDoneTodo",
  async (_id: number) => {
    const response = await axios.put(`todos/todo/${_id}`);
    return response.data;
  }
);

export const allSelect = createAsyncThunk("allSelect", async () => {
  const response = await axios.put(`todos/allselected`);
  return response.data;
});

export const setEditTodo = createAsyncThunk(
  "todos/setEditTodo",
  async (payload: { id: number; title: string }) => {
    const response = await axios.put(`todos/edit/${payload.id}`, {
      title: payload.title,
    });
    return response.data;
  }
);

export const getPaginationTodos = createAsyncThunk(
  "todos/pagination",
  async (payload: { page: number; filter: string }) => {
    const response = await axios.get(`todos/pagination`, {
      params: {
        page: payload.page,
        filter: payload.filter,
      },
    });
    return response.data;
  }
);

export interface Todo {
  _id: number;
  title: string;
  done: boolean;
  isEdit: boolean;
}

interface TodosState {
  todos: Todo[];
  filter: string;
  status: null | "loading" | "succeeded" | "failed";
  error: null | string;
  total: number;
  totalDone: number;
}

const initialState: TodosState = {
  todos: [],
  filter: "all",
  status: null,
  error: null,
  total: 0,
  totalDone: 0,
};

const isAnyPending = isAnyOf(
  getTodos.pending,
  addTodo.pending,
  deletedTodo.pending,
  setDoneTodo.pending,
  setEditTodo.pending,
  clearAllTodo.pending,
  clearComplited.pending,
  allSelect.pending,
  getPaginationTodos.pending
);

const todoSlice = createSlice({
  name: "todos",
  initialState,

  reducers: {
    editTitleTodo(state, action: PayloadAction<{ id: number; title: string }>) {
      const editTodo = state.todos.find(
        (todo) => todo._id === action.payload.id
      );
      if (editTodo) {
        editTodo.title = action.payload.title;
      }
    },

    editorTodo(state, action: PayloadAction<number>) {
      const editTodo = state.todos.find((todo) => todo._id === action.payload);
      if (editTodo) {
        editTodo.isEdit = !editTodo.isEdit;
      }
    },

    openFiltered(state, action) {
      state.filter = action.payload;
    },

    logOutUser(state) {
      state.todos = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos.unshift({
          _id: action.payload._id,
          title: action.payload.title,
          done: false,
          isEdit: false,
        });
        state.total += 1;
      })
      .addCase(addTodo.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deletedTodo.fulfilled, (state, action) => {
        // state.status = "succeeded";
        // state.todos = state.todos.filter((todo) => {
        //   if (todo._id === action.payload._id) {
        //     state.total -= 1;
        //     if (todo.done) {
        //       state.totalDone -= 1;
        //     }
        //   }
        //   return todo._id !== action.payload._id;
        // });

        const updatedTodos = state.todos.filter((todo) => {
          if (todo._id === action.payload._id) {
            return false; // Удаляем элемент из списка
          }
          return true;
        });

        const updatedTotal = state.total - 1;
        const updatedTotalDone = action.payload.done
          ? state.totalDone - 1
          : state.totalDone;

        return {
          ...state,
          todos: updatedTodos,
          total: updatedTotal,
          totalDone: updatedTotalDone,
        };
      })

      .addCase(setDoneTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        const toggledtodo = state.todos.find((todo) => {
          return todo._id === action.payload._id;
        });
        if (toggledtodo?.done) {
          state.totalDone -= 1;
          toggledtodo.done = false;
        } else if (toggledtodo?.done === false) {
          toggledtodo.done = true;
          state.totalDone += 1;
        }
      })

      .addCase(setEditTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        const editTodo = state.todos.find(
          (todo) => todo._id === action.payload._id
        );
        if (editTodo) {
          editTodo.title = action.payload.title;
        }
      })

      .addCase(clearAllTodo.fulfilled, (state) => {
        state.status = "succeeded";
        state.todos = [];
        state.total = 0;
        state.totalDone = 0;
      })

      .addCase(clearComplited.fulfilled, (state) => {
        state.status = "succeeded";
        const filteredTodo = state.todos.filter((todo) => !todo.done);
        state.todos = filteredTodo;
        state.total = filteredTodo.length;
        state.totalDone = 0;
      })
      //
      .addCase(allSelect.fulfilled, (state) => {
        state.status = "succeeded";
        const allDone = state.todos.every((todo) => todo.done);
        state.todos = state.todos.map((todo) => {
          return { ...todo, done: !allDone };
        });
      })

      .addCase(getPaginationTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload.docs;
        state.total = action.payload.totalCount;
        state.totalDone = action.payload.doneTodosCount;
      });

    builder.addMatcher(isAnyPending, (state) => {
      state.status = "loading";
    });
  },
});

export const { editTitleTodo, editorTodo, openFiltered, logOutUser } =
  todoSlice.actions;

export default todoSlice.reducer;
