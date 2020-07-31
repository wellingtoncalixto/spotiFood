import React, { useRef, useEffect, InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';

import { Select, InputLabel } from '@material-ui/core';
import { Container, Content } from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  options: Option[];
  label?: string;
}

interface Option {
  name: string;
  value: string;
}
const SelectBox: React.FC<Props> = ({ name, options, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

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
        <Select native inputRef={inputRef} label={label}>
          <option aria-label="None" value="" />
          {options?.map((option: Option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </Select>
      </Content>
    </Container>
  );
};

export default SelectBox;
