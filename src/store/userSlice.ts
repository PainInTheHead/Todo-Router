import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./../api/index";

export const authorization = createAsyncThunk(
  "user/login",
  async (payload: User) => {
    const response = await axios.post(`user/login`, {
      email: payload.email,
      password: payload.password,
    });
    return response.data;
  }
);

export const registration = createAsyncThunk(
  "user/registration",
  async (payload: User) => {
    const response = await axios.post(`user/registration`, {
      email: payload.email,
      password: payload.password,
    });
    return response.data;
  }
);

export const changeAvatar = createAsyncThunk(
  "user/changeAvatar",
  async (payload: any) => {
    const response = await axios.put(`user/changeAvatar`, {
      avatar: payload.avatar,
      id: payload.id,
    });
    return response.data;
  }
);

export const getUser = createAsyncThunk("user/Infouser", async () => {
  const response = await axios.get(`user/userinfo`);
  return response.data;
});

export const getMe = createAsyncThunk("user/getMe", async () => {
  const response = await axios.get(`user/getMe`);
  return response.data;
});

export interface User {
  email: string;
  password: string;
  id?: string;
  avatar?: string;
  active?: boolean;
}

interface UserState {
  user: User;
  status: null | "loading" | "succeeded" | "failed";
}

const initialState: UserState = {
  user: {
    email: ``,
    password: ``,
    id: `0`,
    active: false,
  },
  status: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetState(state) {
      state.user = {
        email: "",
        password: "",
        id: "0",
        active: false,
      };
    },
    updateUser(state, action) {
      state.user.email = action.payload.email;
      state.user.password = action.payload.password;
      state.user.id = action.payload.id;
      state.user.avatar = action.payload.avatar;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authorization.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authorization.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.user = {
        //     email: action.payload.email,
        //     password: action.payload.password,
        //     id: action.payload._id
        // }
        // state.user.email = `${action.payload.email}`
        // state.user.password = `${action.payload.password}`
      })
      .addCase(registration.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registration.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(changeAvatar.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changeAvatar.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user.avatar = action.payload.avatar;
      })

      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user.avatar = action.payload.avatar;
        state.user.email = action.payload.email;
        state.user.id = action.payload._id;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getMe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(getMe.rejected, (state, action) => {
        state.status = "failed";
        state.user.active = false;
      });
  },
});

export const { updateUser, resetState } = userSlice.actions;

export default userSlice.reducer;
