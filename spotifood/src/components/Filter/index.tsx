import React, { useEffect, useState, RefObject } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container } from './styles';
import Button from '../Button';
import SelectBox from '../SelectBox';
import Input from '../Input';
import Calendar from '../Calendar';

interface Props {
  isOpen: boolean;
  handleSubmit(data: Record<string, unknown>): Promise<void>;
  handleReset?(): void;
  formRef: RefObject<FormHandles>;
}

let i = 0;

const Filter: React.FC<Props> = ({
  isOpen,
  handleSubmit,
  handleReset,
  formRef,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const optionsLocale = [
    {
      value: 'en_AU',
      name: 'en_AU',
    },
    {
      value: 'de_DE',
      name: 'de_DE ',
    },
    {
      value: 'pt_BR',
      name: 'pt_BR',
    },
    {
      value: 'fr_FR',
      name: 'fr_FR',
    },
    {
      value: 'en_US',
      name: 'en_US',
    },
    {
      value: 'es_AR',
      name: 'es_AR',
    },
  ];

  const optionsCountry = [
    {
      value: 'AU',
      name: 'Australia',
    },
    {
      value: 'DE',
      name: 'Alemanhã',
    },
    {
      value: 'BR',
      name: 'Brasil',
    },
    {
      value: 'PT',
      name: 'Portugal',
    },
    {
      value: 'US',
      name: 'EUA',
    },
    {
      value: 'RU',
      name: 'Rússia',
    },
  ];

  useEffect(() => {
    if (isOpen === false && i !== 0) {
      setTimeout(() => setVisible(false), 500);
    } else {
      setVisible(true);
      i++;
    }
  }, [isOpen]);

  return (
    <Container
      visible={visible}
      isOpen={isOpen}
      data-testid="filter"
      id="teste"
    >
      <Form onSubmit={handleSubmit} ref={formRef} onReset={handleReset}>
        <div>
          <Input name="name" label="Nome da Playlist" type="text" />
          <Calendar name="timestamp" label="Data e Horario" />
        </div>
        <div>
          <SelectBox name="locale" options={optionsLocale} label="Locale" />
          <SelectBox name="country" options={optionsCountry} label="País" />
        </div>
        <div>
          <Input
            name="limit"
            label="Quantidade"
            type="number"
            placeholder="0"
          />
          <Input name="offset" label="Página" type="number" placeholder="0" />
        </div>
        <hr />
        <div className="button-container">
          <div id="submit">
            <Button type="submit">Filtrar</Button>
          </div>
          <div id="reset">
            <Button type="reset">Limpar Fltros</Button>
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default Filter;
