import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    accessToken: '',
  },
  isLoggedIn: false,
};

export const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logIn: (state, action) => {
      if (state.isLoggedIn) {
        console.log('error');
      } else {
        state.user.accessToken = action.payload.accessToken;
      }
    },
    logOut: (state, action) => {
      state.user.accessToken = '';
      state.isLoggedIn = false;
    },

    // Petra: La till en funktion som togglar isloggedin-state,
    // så att vi bara aktiverar det när login är successfull!
    toggleLoggedInOut: (state, action) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

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
      .then((res) => res.json())
      .then((json) => {
        dispatch(users.actions.logIn(json));

        // Vi behöver få in en kontroll om lösenordet är fel här
        dispatch(users.actions.toggleLoggedInOut());
      });
  };
};
