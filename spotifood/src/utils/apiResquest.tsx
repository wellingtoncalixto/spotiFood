import api from '../services/api';
import { PlayList } from '../pages/Dashboard';


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
