import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    accessToken: '',
    name: '',
  },
  isLoggedIn: false,
  errorMessage: '',
};

export const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.user.accessToken = action.payload.accessToken;
      state.user.name = action.payload.name;
    },
    logOut: (state, action) => {
      state.user.accessToken = '';
      state.user.name = '';
      state.isLoggedIn = false;
    },
    toggleLoggedInOut: (state, action) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    setError: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

// ----------------------------------------------------------------

export const manageUser = ({ url, user }) => {
  return (dispatch) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          dispatch(users.actions.toggleLoggedInOut());
        }
        return res.json();
      })
      .then((json) => {
        if (json.message) {
          dispatch(users.actions.setError(json.message));
        } else {
          dispatch(users.actions.logIn(json));
          dispatch(users.actions.setError(''));
        }
      });
  };
};