import styled from 'styled-components';

export const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
  justify-content: center;

  & > button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 1px 1px 10px 5px rgba(0, 0, 0, 0.3);

    span {
      color: #fff;
      font-size: 1em;
    }

    svg {
      margin-left: 10px;
    }

    @media (max-width: 800px) {
      width: 100%;
    }
  }
  h2 {
    margin-top: 50px;
    text-align: center;
    color: #fff;
    font-size: 3em;
    font-family: 'Roboto Slab';
    font-weight: 600;
    text-decoration: underline;
    word-wrap: break-word;
  }

  @media (max-width: 800px) {
    margin: 0;
    width: 100%;
    justify-content: center;
  }

  @media (max-width: 400px) {
    h2 {
      font-size: 1em;
      color: #fff;
    }
  }
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  & > a {
    margin: 10px 10px;
    text-decoration: none;
  }
`;

export const LoaderContainer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
