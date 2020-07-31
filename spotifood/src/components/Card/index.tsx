import React from 'react';

import { Container, Name } from './styles';

interface Props {
  img: string;
  name: string;
  url: string;
}

const Card: React.FC<Props> = ({ img, name, url }) => (
  <Container href={url} target="_blank">
    <img src={`${img}`} alt="teste" />
    <Name>
      <span>{name}</span>
    </Name>
  </Container>
);

export default Card;
