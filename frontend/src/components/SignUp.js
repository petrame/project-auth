import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { manageUser } from '../reducers/users';

export const SignUp = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  // Create a user and send a post request to add the user to the database
  const createUser = (user) => {
    dispatch(
      manageUser({
        url: 'http://localhost:8080/users',
        user: user,
      })
    );
  };

  // Save the input into a new user object
  const onSubmitHandler = (event) => {
    event.preventDefault();
    createUser(user);
    setUser({ name: '', email: '', password: '' });
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          onSubmitHandler(event);
        }}
      >
        <label>
          Name
          <input
            value={user.name}
            onChange={(event) => setUser({ ...user, name: event.target.value })}
            type="text"
            required
          ></input>
        </label>

        <label>
          Email
          <input
            value={user.email}
            onChange={(event) =>
              setUser({ ...user, email: event.target.value })
            }
            type="email"
            required
          ></input>
        </label>
        <label>
          Password
          <input
            value={user.password}
            onChange={(event) =>
              setUser({ ...user, password: event.target.value })
            }
            type="password"
            required
          ></input>
        </label>

        <button type="submit">Create user</button>
      </form>
    </div>
  );
};
