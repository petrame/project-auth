import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { manageUser } from '../reducers/users';

export const LogIn = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: '', password: '' });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(manageUser({ url: 'http://localhost:8080/sessions', user: user }));
    setUser({ email: '', password: '' });
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          onSubmitHandler(event);
        }}
      >
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
            id="password"
            value={user.password}
            onChange={(event) =>
              setUser({ ...user, password: event.target.value })
            }
            type="password"
            required
          ></input>
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};
