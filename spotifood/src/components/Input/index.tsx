import React, {
  useRef,
  useEffect,
  InputHTMLAttributes,
} from 'react';
import { useField } from '@unform/core';
import { TextField, InputLabel } from '@material-ui/core';
import { Container, Content, Error } from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  type?: string;
}

const Input: React.FC<Props> = ({ name, type, label, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <Container hasError={!!error}>
      <InputLabel shrink>{label}</InputLabel>
      <Content hasError={!!error}>
        <TextField
          inputRef={inputRef}
          type={type}
          InputLabelProps={{
            shrink: true,
          }}
          error={!!error}
        />
      </Content>
      {error && (
        <Error>
          <span>{error}</span>
        </Error>
      )}
    </Container>
  );
};

export default Input;
