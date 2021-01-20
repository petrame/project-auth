import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

// Components
import { SignUp } from './SignUp';
import { LogIn } from './LogIn';
import { ErrorMessage } from './ErrorMessage';
import { Content } from './Content';

// ----------------------------------------------------------------

export const Main = () => {
  const [notNewUser, setNotNewUser] = useState(false);
  const isLoggedIn = useSelector((store) => store.users.isLoggedIn);
  const name = useSelector((store) => store.users.user.name);
  const errorMessage = useSelector((store) => store.users.errorMessage);

  return (
    <Wrapper>
      {!isLoggedIn && !notNewUser && <SignUp />}
      {notNewUser && <LogIn />}

      <ErrorMessage errorMessage={errorMessage} />
      {!isLoggedIn && (
        <>
          <Text>{notNewUser ? 'Not a user?' : 'Already a user?'}</Text>
          <Button onClick={() => setNotNewUser(!notNewUser)}>
            {notNewUser ? 'Sign up instead' : 'Log in instead'}
          </Button>
        </>
      )}
      {isLoggedIn && <Content name={name} />}
    </Wrapper>
  );
};

// ----------------------------------------------------------------

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  font-family: 'Inconsolata';
  padding: 6px 15px;
  background: none;
  border: 1px solid #000;
  width: 150px;
  margin: 15px 30px 30px;
  cursor: pointer;
`;

const Text = styled.p`
  margin-top: 20px;
  font-size: 14px;
  padding-top: 30px;
  border-top: 1px solid #000;
`;