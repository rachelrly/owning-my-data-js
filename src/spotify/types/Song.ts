export interface SongType {
    endTime: string
    artistName: string
    trackName: string
    msPlayed: Number
}

export interface SongValueType {
    value: SongType
}

export type SongTitleArtistInputType = Omit<SongType, 'msPlayed' | 'endTime'>
