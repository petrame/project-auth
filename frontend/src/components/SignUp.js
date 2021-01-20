import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

// Reducers
import { manageUser } from '../reducers/users';

// ----------------------------------------------------------------

export const SignUp = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  // Send a post request to add the user to the database by sending the user object
  const createUser = (user) => {
    dispatch(
      manageUser({
        url: 'https://auth-by-karin-petra.herokuapp.com/users',
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
    <Wrapper
      onSubmit={(event) => {
        onSubmitHandler(event);
      }}
    >
      <Label>
        <LabelText>Name</LabelText>
        <input
          value={user.name}
          onChange={(event) => setUser({ ...user, name: event.target.value })}
          type="text"
          required
        ></input>
      </Label>

      <Label>
        <LabelText>Email</LabelText>
        <input
          value={user.email}
          onChange={(event) => setUser({ ...user, email: event.target.value })}
          type="email"
          required
        ></input>
      </Label>

      <Label>
        <LabelText>Password</LabelText>
        <input
          value={user.password}
          onChange={(event) =>
            setUser({ ...user, password: event.target.value })
          }
          type="password"
          required
        ></input>
      </Label>

      <Button type="submit">Create user</Button>
    </Wrapper>
  );
};

// ----------------------------------------------------------------

const Wrapper = styled.form`
  max-width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
  input {
    font-family: 'Inconsolata';
    width: 200px;
    border: 1px solid #000;
    line-height: 20px;
    padding: 5px;
  }
`;

const LabelText = styled.p`
  display: inline;
  margin-right: 10px;
  width: 100px;
  text-align: right;
`;

const Button = styled.button`
  font-family: 'Inconsolata';
  padding: 6px 15px;
  background: none;
  border: 1px solid #000;
  width: 150px;
  margin: 30px;
  cursor: pointer;
`;