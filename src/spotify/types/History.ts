import {CountedSongType, PlaysSongType, SongType} from './Song'

// Not currently used
export type HistoryMapType = Map<string, SongType>

export type ListenHistoryMapType = Map<string, CountedSongType>

export type PlaysHistoryMapType = Map<string, PlaysSongType>
