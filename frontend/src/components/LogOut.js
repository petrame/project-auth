import React from 'react';
import { useDispatch } from 'react-redux';

import { users } from '../reducers/users';

export const LogOut = () => {
  const dispatch = useDispatch();
  const handleButton = () => {
    dispatch(users.actions.logOut());
  };
  return <button onClick={handleButton}>Log out</button>;
};
