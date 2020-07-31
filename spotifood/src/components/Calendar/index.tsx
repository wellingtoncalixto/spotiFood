import React, { InputHTMLAttributes, useRef, useEffect } from 'react';
import { TextField, InputLabel } from '@material-ui/core';
import { useField } from '@unform/core';
import { Container, Content } from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

const Calendar: React.FC<Props> = ({ name, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField,  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <InputLabel shrink>{label}</InputLabel>
      <Content>
        <TextField
          inputRef={inputRef}
          type="datetime-local"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Content>
    </Container>
  );
};

export default Calendar;
