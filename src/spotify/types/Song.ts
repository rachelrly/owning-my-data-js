export interface SongType {
  endTime: string
  artistName: string
  trackName: string
  msPlayed?: number
  listens?: number
  plays?: SongPlayDataType[]
}

export interface CountedSongType extends Omit<SongType, 'listens'> {
  listens: number
}

export interface OGSongType extends Omit<SongType, 'msPlayed'> {
  // What we get from Spotify data
  msPlayed: number
}

export type SongPlayDataType = Omit<SongType, 'artistName' | 'trackName'>

export type SongTitleArtistInputType = Omit<SongType, 'msPlayed' | 'endTime'>
