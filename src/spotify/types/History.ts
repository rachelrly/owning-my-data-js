import {SongType} from './Song'

export interface SongHistoryType {
    listens: number,
    song: SongType
}

export type HistoryMapType = Map<string, SongHistoryType>