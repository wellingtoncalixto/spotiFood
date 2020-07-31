import styled from 'styled-components';

export const Container = styled.a`
  display: flex;
  background: #fff;
  flex-direction: column;
  min-width: 200px;
  max-width: 200px;
  height: 250px;
  padding: 10px;
  box-shadow: 1px 1px 10px 5px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  cursor: pointer;
  color: #000;
  img {
    width: 100%;
    height: 150px;
  }
`;

export const Name = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-weight: 600;
    font-size: 1rem;
    text-align: center;
  }
`;
