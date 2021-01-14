import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { SignUp } from './SignUp';
import { LogIn } from './LogIn';
import { LogOut } from './LogOut';
import { Content } from './Content';

export const Main = () => {
  const [notNewUser, setNotNewUser] = useState(false);
  const isLoggedIn = useSelector((store) => store.users.isLoggedIn);

  return (
    <Wrapper>
      {!isLoggedIn && <SignUp />}
      {!isLoggedIn && <LogIn />}
      {isLoggedIn && <LogOut />}
      {isLoggedIn && <Content />}
    </Wrapper>
  );
};

const Wrapper = styled.div``;
