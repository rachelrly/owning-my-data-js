export interface SongType {
    endTime: string
    artistName: string
    trackName: string
    msPlayed?: number
    listens?: number
    plays?: SongType[]
}

export interface CountedSongType extends Omit<SongType, 'listens'> {
    listens: number
}

export interface PlaysSongType extends Omit<SongType, 'plays'>{
    plays: SongType[]
}

export interface OGSongType extends Omit<SongType, 'msPlayed'> { // What we get from Spotify data
    msPlayed: number
}

export type SongTitleArtistInputType = Omit<SongType, 'msPlayed' | 'endTime'>
