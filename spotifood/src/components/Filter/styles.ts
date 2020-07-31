import styled, { css } from 'styled-components';

interface PropsContainer {
  readonly visible: boolean;
  readonly isOpen: boolean;
}

export const Container = styled.div<PropsContainer>`
  margin-bottom: 15px;
  height: 0;
  transition: height linear 0.5s;
  background: #fff;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  overflow: auto;
  margin-top: 20px;
  ${props =>
    props.isOpen &&
    css`
      height: 350px;
    `}
  min-width: 350px;
  width: 50%;
  border-radius: 10px;

  form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 15px 25px;

    & > div {
      display: flex;
      flex-wrap: wrap;
      margin-top: 15px;

      & > div {
        :nth-child(2n) {
          margin: 0 30px;
        }
      }
    }
    @media (max-width: 1400px) {
      & > div {
        justify-content: flex-start;
      }
    }

    @media (max-width: 800px) {
      & > div {
        justify-content: center;

        & > div {
          :nth-child(2n) {
            margin: 0;
          }
        }
      }
    }

    hr {
      margin-top: 15px;
      width: 100%;
      color: #c6c6c6;
    }

    .button-container {
      display: flex;
      width: 100%;
      align-items: center;
      margin-bottom: 30px;
      #submit {
        width: 50%;
        button {
          padding: 0;
          background: red;
          width: 100%;
          color: white;
          font-size: 1.25rem;
          height: 40px;
        }
      }

      #reset {
        width: 50%;
        margin: 0;
        button {
          padding: 0;
          background: none;
          color: red;
          width: 100%;
          font-size: 1.25rem;
          height: fit-content;
          :hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  @media (max-width: 1400px) {
    width: 100%;
  }
  @media (max-width: 800px) {
    width: 100%;
    min-width: 100%;
  }
`;
