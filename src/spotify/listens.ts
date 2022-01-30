import { SpotifyHistory } from './spotify_data'
import {
  ListenHistoryMapType,
  OGSongType,
  SongType,
  CountedSongType
} from './types'
import { createTitleArtistString } from './utils'

// This file does the same thing as './plays.ts', only
// it denormalizes the listen count instead of storing the plays.
// It was written first and is not used but is kept for ref.
export function createListensHistoryMap() {
  const MappedSpotifyHistory: ListenHistoryMapType = new Map()
  SpotifyHistory.forEach((value: OGSongType) => {
    if (value.msPlayed < 10000) {
      return // Filters out listens < 10 seconds
    }
    const songId = createTitleArtistString(value)
    if (MappedSpotifyHistory.has(songId)) {
      const song = MappedSpotifyHistory.get(songId)
      // This is to placate the TS compiler with Map methods
      // We already check if the song is in the map above, so we already know it will always be there
      if (song) {
        const storeSong: SongType = value
        if ('msPlayed' in storeSong) delete storeSong.msPlayed
        MappedSpotifyHistory.set(songId, {
          listens: song.listens + 1,
          ...storeSong
        })
      }
    } else MappedSpotifyHistory.set(songId, { listens: 1, ...value })
  })
  return MappedSpotifyHistory
}

export function sortListensHistoryMap(
  history: ListenHistoryMapType,
  minListens = 100
) {
  return [...history.entries()] // Converts map into array
    .sort((a, b) => (a[1].listens > b[1].listens ? -1 : 1))
    .slice(0, 100)
    .map((song: [string, CountedSongType]) => song[1])
    .filter((song: CountedSongType) => song.listens > minListens)
}
