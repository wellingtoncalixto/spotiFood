import styled, { css } from 'styled-components';

interface Error {
  readonly hasError: boolean;
}

export const Container = styled.div<Error>`
  height: auto;
  width: 180px;
`;

export const Content = styled.div<Error>`
  background: #f2f2f9;
  height: max-content;
  border: 1px solid transparent;

  ${props =>
    props.hasError &&
    css`
      border: 1px solid #c53030;
    `}
  & > div {
    & > div {
      height: max-content;
      ::after {
        content: none;
      }
      ::before {
        content: none;
      }
    }
    input {
      padding: 7px 15px;
      width: 150px;
      height: auto;

      @media (max-width: 800px) {
        width: 100%;
      }
    }
    input[type='number']::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    input[type='number'] {
      -moz-appearance: textfield;
    }
  }
`;

export const Error = styled.div`
  span {
    width: max-content;
    color: #c53030;
    font-size: small;
  }
`;
