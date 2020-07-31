import React, { useEffect, useState, useCallback, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import * as yup from 'yup';
import { FormHandles } from '@unform/core';
import {
  CircularProgress,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';
import api from '../../services/api';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Filter from '../../components/Filter';
import Button from '../../components/Button';

import { Container, CardContainer, LoaderContainer } from './styles';
import getValidationErros from '../../utils/getValidationErros';
import { useToast } from '../../hooks/toast';
import parseFilter from '../../utils/parseFilter';
import apiResquest from '../../utils/apiResquest';
import { filterByName } from '../../utils/filterByName';
import { useAuth } from '../../hooks/auth';

export interface PlayList {
  description: string;
  external_urls: {
    spotify: string;
  };
  name: string;
  id: string;
  images: Imagens[];
}

interface Imagens {
  url: string;
}

interface Filter {
  country?: string;
  locale?: string;
  timestamp?: string;
  limit?: string;
  offset?: string;
}

const Dashboard: React.FC = () => {
  const [playlists, setPlaylists] = useState<PlayList[]>();
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState<PlayList>({} as PlayList);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const formRef = useRef<FormHandles & HTMLFontElement>(null);
  const { refresh_token, token } = useAuth();
  async function getPlayLists() {
    if (token) {
      try {
        setLoading(true);
        const response = await apiResquest({}, refresh_token, token);
        setPlaylists(response.data.playlists.items);
        setLoading(false);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na requisição',
          description:
            'Houve um erro na requição, por favor tente novamente mais tarde',
        });
        setLoading(false);
      }
    } else {
      addToast({
        type: 'info',
        title: 'Seja bem vindo',
        description: 'Faça login no spotify para prosseguir',
      });
    }
  }

  useEffect(() => {
    getPlayLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addToast]);

  const handleSubmit = useCallback(
    async (data: any) => {
      if (token) {
        try {
          setLoading(true);
          formRef.current?.setErrors({});
          const schema = yup.object().shape({
            limit: yup
              .number()
              .positive()
              .integer()
              .moreThan(0, 'insira um numero maior que 1')
              .lessThan(50, 'insira um numero menor que 50')
              .notRequired()
              .typeError('')
              .transform(value => (Number.isNaN(value) ? undefined : value)),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          const filterParams = parseFilter(data);
          const response = await apiResquest(
            filterParams,
            refresh_token,
            token,
          );

          const reponsePlaylists: PlayList[] = response.data.playlists.items;

          if (reponsePlaylists.length > 0) {
            if (data.name) {
              const playlistByName = filterByName(data.name, reponsePlaylists);
              if (playlistByName.length > 0) {
                setLoading(false);
                setPlaylists(playlistByName);
                setOpenFilter(false);
              } else {
                setLoading(false);
                setOpenFilter(false);
                addToast({
                  type: 'info',
                  title: 'Nenhum Registro',
                  description:
                    'Não encontramos nenhuma playlist que corresponda com a sua pesquisa',
                });
              }
            } else {
              setLoading(false);
              setPlaylists(response.data.playlists.items);
              setOpenFilter(false);
            }
          } else {
            setLoading(false);
            addToast({
              type: 'info',
              title: 'Nenhum Registro',
              description:
                'Não encontramos nenhuma playlist que corresponda com a sua pesquisa',
            });
          }
          setFilter(filterParams);
        } catch (err) {
          if (err instanceof yup.ValidationError) {
            const errors = getValidationErros(err);
            formRef.current?.setErrors(errors);
          } else {
            addToast({
              type: 'error',
              title: 'Error ao realizar o filtro',
              description:
                'Pedimos desculpas, mas ocorreu um erro ao tentar realizar a sua pesquisa',
            });
          }
          setLoading(false);
        }
      }
    },
    [addToast],
  );

  const handleReset = useCallback(async () => {
    if (token) {
      setLoading(true);
      const response = await apiResquest({}, refresh_token, token);
      setPlaylists(response.data.playlists.items);
      setFilter({} as PlayList);
      setLoading(false);
    }
  }, []);

  const interval = useCallback(async () => {
    if (token) {
      const response = await apiResquest(filter, refresh_token, token);
      if (filter.name) {
        const playlistByName = await filterByName(
          filter.name,
          response.data.playlists.items,
        );
        setPlaylists(playlistByName);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setInterval(interval, 30000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customTheme = createMuiTheme({
    palette: {
      secondary: {
        main: '#fff',
      },
    },
  });
  return (
    <>
      <Header />
      <Container>
        {!!token && (
          <>
            <Button type="button" onClick={() => setOpenFilter(!openFilter)}>
              <span>Pesquisar</span>
              <FiSearch color="#fff" size="30px" />
            </Button>
            <Filter
              isOpen={openFilter}
              handleSubmit={handleSubmit}
              handleReset={handleReset}
              formRef={formRef}
            />
            <CardContainer>
              {loading && (
                <ThemeProvider theme={customTheme}>
                  <LoaderContainer>
                    <CircularProgress color="secondary" size="100px" />
                  </LoaderContainer>
                </ThemeProvider>
              )}
              {playlists &&
                loading === false &&
                playlists?.length > 0 &&
                playlists?.map(playlist => (
                  <Card
                    key={playlist.id}
                    name={playlist.name}
                    img={playlist.images[0].url}
                    url={playlist.external_urls.spotify}
                  />
                ))}
            </CardContainer>
          </>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
