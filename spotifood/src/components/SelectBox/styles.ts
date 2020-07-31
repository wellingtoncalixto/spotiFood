import styled from 'styled-components';

export const Container = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  width: 180px;
`;

export const Content = styled.div`
  background: #f2f2f9;
  height: auto;
  border: 1px solid transparent;
  width: 100%;
  div {
    height: 100%;
    width: 100%;

    ::after {
      content: none;
    }
    ::before {
      content: none;
    }
    select {
      padding: 7px 15px;
      width: 100%;

      height: 100%;

      :focus {
        background: none;
      }
    }
  }
`;
