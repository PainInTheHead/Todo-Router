import { createSlice, createAsyncThunk, PayloadAction ,isAnyOf } from "@reduxjs/toolkit";
import axios from "./../api/index";
// const token = localStorage.getItem("token");
// axios.defaults.headers.common["Authorization"] = token;

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  const response = await axios.get("todos/todo");
  return response.data;
});

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (payload: {title: string}) => {
    const response = await axios.post("todos/todo", {
      title: payload.title,
    });
    return response.data;
  }
);

export const deletedTodo = createAsyncThunk(
  "todos/deletedTodo",
  async (_id: any) => {
    const response = await axios.delete(
      `todos/todo/${_id}`
    );
    return response.data;
  }
);

export const clearAllTodo = createAsyncThunk("clearAllTodo", async () => {
  const response = await axios.delete(
    `todos/clearholder`
  );
  return response.data;
});
export const clearComplited = createAsyncThunk("clearComplited", async () => {
  const response = await axios.delete(
    `todos/clearComplited`
  );
  return response.data;
});

export const setDoneTodo = createAsyncThunk(
  "todos/setDoneTodo",
  async (id: any) => {
    const response = await axios.put(`todos/todo/${id}`);
    return response.data;
  }
);

export const allSelect = createAsyncThunk("allSelect", async () => {
  const response = await axios.put(`todos/allselected`);
  return response.data;
});

export const setEditTodo = createAsyncThunk(
  "todos/setEditTodo",
  async (payload: { id: any; title: string }) => {
    const response = await axios.put(
      `todos/edit/${payload.id}`,
      { title: payload.title }
    );
    return response.data;
  }
);

interface Todo {
  _id: any;
  title: string;
  done: boolean;
  isEdit: boolean;
}

interface TodosState {
  todos: Todo[];
  filter: string;
  status: null | 'loading' | 'succeeded' | 'failed';
  error: null | string;
}

const initialState: TodosState = {
  todos: [],
  filter: "all",
  status: null,
  error: null,
};

const isAnyPending = isAnyOf(
  getTodos.pending,
  addTodo.pending,
  deletedTodo.pending,
  setDoneTodo.pending,
)

const todoSlice = createSlice({
  name: "todos",
  initialState,

  reducers: {
    editTitleTodo(state, action: PayloadAction<{ id: any; title: string }>) {
      const editTodo = state.todos.find(
        (todo) => todo._id === action.payload.id
      );
      if (editTodo) {
        editTodo.title = action.payload.title;
      }
    },

    editorTodo(state, action: PayloadAction<any>) {
      const editTodo = state.todos.find((todo) => todo._id === action.payload);
      if (editTodo) {
        editTodo.isEdit = !editTodo.isEdit;
      }
    },

    openFiltered(state, action) {
      state.filter = action.payload;
    },

    logOutUser(state) {
      state.todos = []
    }
  },

  extraReducers: (builder) => {

    builder
      // .addCase(getTodos.pending, (state) => {
      //   state.status = "loading";
      // })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      // .addCase(addTodo.pending, (state) => {
      //   state.status = "loading";
      // })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos.push({
          _id: action.payload._id,
          title: action.payload.title,
          done: false,
          isEdit: false,
        });
      })
      .addCase(addTodo.rejected, (state) => {
        state.status = "failed";
      })
      // .addCase(deletedTodo.pending, (state) => {
      //   state.status = "loading";
      // })
      .addCase(deletedTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = state.todos.filter(
          (todo) => todo._id !== action.payload._id
        );
      })
      // .addCase(setDoneTodo.pending, (state) => {
      //   state.status = "loading";
      // })
      .addCase(setDoneTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        const toggledtodo = state.todos.find(
          (todo) => todo._id === action.payload._id
        );
        if (toggledtodo) {
          toggledtodo.done = !toggledtodo.done;
        }
      })
      .addCase(setEditTodo.pending, (state) => {
        state.status = "loading";
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
      .addCase(clearAllTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearAllTodo.fulfilled, (state) => {
        state.status = "succeeded";
        state.todos = [];
      })
      .addCase(clearComplited.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearComplited.fulfilled, (state) => {
        state.status = "succeeded";
        const filteredTodo = state.todos.filter((todo) => !todo.done);
        state.todos = filteredTodo;
      })
      .addCase(allSelect.pending, (state) => {
        state.status = "loading";
      })
      .addCase(allSelect.fulfilled, (state) => {
        state.status = "succeeded";
        const allDone = state.todos.every((todo) => todo.done);
        state.todos = state.todos.map((todo) => {
          return { ...todo, done: !allDone };
        });
      })
      // .addCase(authorization.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(authorization.fulfilled, (state) => {
      //   state.status = "succeeded";
      // });
      builder.addMatcher(isAnyPending, (state) =>{
        state.status = 'loading'
      })
  },
});

export const { editTitleTodo, editorTodo, openFiltered,  logOutUser } = todoSlice.actions;

export default todoSlice.reducer;
