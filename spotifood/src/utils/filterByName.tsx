import { PlayList } from '../pages/Dashboard';

export function filterByName(name: string, playlists: PlayList[]): PlayList[] {
  const playlistByName: PlayList[] = [];
  playlists.map((playlist: PlayList): void => {
    if (playlist.name.toLowerCase().includes(name)) {
      playlistByName.push(playlist);
    }
  });

  return playlistByName;
}
