import React, { useEffect } from 'react';
import { Container } from './styles';
import logo from '../../assets/spotiFoodLogo.png';
import logoSpotify from '../../assets/spotifyLogo.svg';
import { useAuth } from '../../hooks/auth';

const Header: React.FC = () => {
  const { saveToken, token } = useAuth();

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
  useEffect(() => {
    const { access_token, refresh_token } = getHashParams();
    saveToken(access_token, refresh_token);
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
