import React from 'react';
import styled from 'styled-components';
import { Card } from '../components';

const ContainerGrid = styled.div`
  width: 100%;
  gap: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const Home = () => {
  return (
    <ContainerGrid>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </ContainerGrid>
  );
};

export default Home;
