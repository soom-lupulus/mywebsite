export namespace MusicType {
  type Base = {
    id: number;
    uuid: number;
    name: string;
    cover: string;
    createdAt: string;
    updatedAt: string;
  };

  export type AlbumProps = {
    description: string;
    year: string;
  } & Base;

  export type SongProps = {
    album_id: number;
    album_name: string;
    artist: string;
    source: string;
    lrc_source: string;
    play_count: number;
  } & Base;

  export type lyricProps = {
    stop: () => void;
    play: () => void;
    toggleState: () => void;
  };
}
