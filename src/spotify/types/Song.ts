export interface SongType {
    endTime: string
    artistName: string
    trackName: string
    msPlayed: number
}

export interface SongValueType {
    value: SongType
}

export type SongTitleArtistInputType = Omit<SongType, 'msPlayed' | 'endTime'>
