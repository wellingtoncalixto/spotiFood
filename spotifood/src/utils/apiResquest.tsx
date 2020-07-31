import axios from 'axios';

import api from '../services/api';
import { PlayList } from '../pages/Dashboard';

// const getSpotifyCredentials = async () => {
//   const res = await axios.get('/api/spotify-credentials');
//   const spotifyCredentials = res.data;
//   return spotifyCredentials;
// };

// const scopesArr = [
//   'user-modify-playback-state',
//   'user-read-currently-playing',
//   'user-read-playback-state',
//   'user-library-modify',
//   'user-library-read',
//   'playlist-read-private',
//   'playlist-read-collaborative',
//   'playlist-modify-public',
//   'playlist-modify-private',
//   'user-read-recently-played',
//   'user-top-read',
// ];
// const scopes = scopesArr.join(' ');

// const getAuthorizationCode = async () => {
//   try {
//     const credentials = await getSpotifyCredentials(); // we wrote this function above
//     const redirectUrl = AuthSession.getRedirectUrl(); // this will be something like https://auth.expo.io/@your-username/your-app-slug
//     const result = await AuthSession.startAsync({
//       authUrl: `${
//         'https://accounts.spotify.com/authorize' +
//         '?response_type=code' +
//         '&client_id='
//       }${credentials.clientId}${
//         scopes ? `&scope=${encodeURIComponent(scopes)}` : ''
//       }&redirect_uri=${encodeURIComponent(redirectUrl)}`,
//     });
//   } catch (err) {
//     console.error(err);
//   }
//   return result.params.code;
// };

// const getTokens = async () => {
//   try {
//     const authorizationCode = await getAuthorizationCode(); // we wrote this function above
//     const credentials = await getSpotifyCredentials(); // we wrote this function above (could also run this outside of the functions and store the credentials in local scope)
//     const credsB64 = btoa(
//       `${credentials.clientId}:${credentials.clientSecret}`,
//     );
//     const response = await fetch('https://accounts.spotify.com/api/token', {
//       method: 'POST',
//       headers: {
//         Authorization: `Basic ${credsB64}`,
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${credentials.redirectUri}`,
//     });
//     const responseJson = await response.json();
//     // destructure the response and rename the properties to be in camelCase to satisfy my linter ;)
//     const {
//       access_token: accessToken,
//       refresh_token: refreshToken,
//       expires_in: expiresIn,
//     } = responseJson;

//     const expirationTime = new Date().getTime() + expiresIn * 1000;
//     await setUserData('accessToken', accessToken);
//     await setUserData('refreshToken', refreshToken);
//     await setUserData('expirationTime', expirationTime);
//   } catch (err) {
//     console.error(err);
//   }
// };

export interface Response {
  data: {
    playlists: {
      items: PlayList[];
    };
  };
}

export default async function apiResquest(
  filter: any = {},
  refresh_token: string,
  token: string,
): Promise<Response> {
  const response: Response = await api.get('v1/browse/featured-playlists', {
    params: filter,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}
