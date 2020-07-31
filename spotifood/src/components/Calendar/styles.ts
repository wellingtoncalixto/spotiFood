import styled from 'styled-components';

export const Container = styled.div`
  height: auto;
`;

export const Content = styled.div`
  background: #f2f2f9;
  height: auto;
  border: 1px solid transparent;
  div {
    height: 100%;
    ::after {
      content: none;
    }
    ::before {
      content: none;
    }
    input {
      padding: 5px 15px;
      width: 220px;
      height: 100%;
    }
  }
`;
