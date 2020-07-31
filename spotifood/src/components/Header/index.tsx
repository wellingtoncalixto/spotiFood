import React, { useEffect, useCallback } from 'react';
import { Container } from './styles';
import logo from '../../assets/spotiFoodLogo.png';
import logoSpotify from '../../assets/spotifyLogo.svg';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

const Header: React.FC = () => {
  const { saveToken, token } = useAuth();
  const { addToast } = useToast();
  function getHashParams() {

    const hashParams: any = {};
    let e;
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  const saveNewToken = useCallback(async () => {
    const { access_token, refresh_token } = getHashParams();
    if(access_token && refresh_token) {
      await saveToken(access_token, refresh_token);
    } else if(token === undefined) {
      addToast({
        type: 'info',
        title: 'Seja bem vindo',
        description: 'Faça login no spotify para prosseguir',
      });
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    saveNewToken()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Container>
        <div>
          <img src={logo} alt="logo" />
          <h2>Encontre a playlist que combine com o seu pedido.</h2>
        </div>
        {!!token === false && (
          <a href="http://localhost:8888">
            <img src={logoSpotify} alt="spotify" />
            Faça login pelo spotify
          </a>
        )}
      </Container>
    </>
  );
};

export default Header;
