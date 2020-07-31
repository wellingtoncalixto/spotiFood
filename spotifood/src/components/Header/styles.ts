import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  background: #f2f2f2;
  justify-content: space-around;
  flex-wrap: wrap;
  box-shadow: 1px 1px 10px 5px rgba(0, 0, 0, 0.5);

  div {
    display: flex;
    align-items: center;
    img {
      width: fit-content;
      height: fit-content;
    }

    h2 {
      font-size: 1.25em;
      color: #851d28;
      margin-left: 20px;
    }
  }

  a {
    border: none;

    display: flex;
    align-items: center;
    border-radius: 5px;
    background: #1db954;
    justify-content: center;
    padding: 5px;
    transition: background-color 2s;
    color: #f2f2f2;
    font-size: 1em;
    text-decoration: none;
    :hover {
      background: ${shade(0.2, '#1db954')};
    }

    img {
      margin-right: 10px;
      width: 50px;
      height: 50px;
    }
  }

  @media (max-width: 400px) {
    flex-direction: column;

    h2 {
      display: none;
    }
  }
`;
