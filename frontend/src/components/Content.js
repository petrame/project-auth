import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

// Components
import { LogOut } from './LogOut';

// ----------------------------------------------------------------

export const Content = ({ name }) => {
  const [secretMessage, setSecretMessage] = useState('');
  const [secretVisible, setSecretVisible] = useState(false);
  const accessToken = useSelector((store) => store.users.user.accessToken);

  const handleClick = () => {
    fetch('https://auth-by-karin-petra.herokuapp.com/private', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setSecretMessage(json.message);
        setSecretVisible(true);
      });
  };

  return (
    <Wrapper>
      <Text>
        Welcome {name}! Click below to reveal the top secret message! 🤫
      </Text>
      <Button onClick={() => handleClick()}>Reveal my secret message</Button>
      {secretVisible && <Text>{secretMessage}</Text>}
      <LogOut />
    </Wrapper>
  );
};

// ----------------------------------------------------------------

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 2;
`;

const Button = styled.button`
  font-family: 'Inconsolata';
  padding: 6px 15px;
  background: none;
  border: 1px solid #000;
  margin: 15px 30px 30px;
  cursor: pointer;
`;

const Text = styled.p`
  text-align: center;
  max-width: 80vw;
`;