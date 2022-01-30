import { SpotifyHistory } from './spotify_data'
import { HistoryMapType, OGSongType, SongType, SongPlayDataType } from './types'
import { createTitleArtistString } from './utils'

// This file is an improved(?) version of './listens.ts'
// That stores each play of the song in an array on the song's history
// and uses `song.plays.length` to rank songs
export function createPlaysHistoryMap() {
  const MappedSpotifyHistory: HistoryMapType = new Map()
  SpotifyHistory.forEach((value: OGSongType) => {
    if (value.msPlayed < 60000) {
      return // Filters out listens < 1 minute
    }
    const songId = createTitleArtistString(value)
    if (MappedSpotifyHistory.has(songId)) {
      const song = MappedSpotifyHistory.get(songId)
      // This is to placate the TS compiler with Map methods
      // We already check if song exists above, so it will always be present
      if (song) {
        if (song.plays !== undefined) {
          const songPlayData: SongPlayDataType = value
          const plays: SongPlayDataType[] = [...song.plays, songPlayData]
          // removes 'plays' key because spread operator always overwrites keys
          if ('plays' in song) delete song.plays
          MappedSpotifyHistory.set(songId, { ...song, plays })
        }
      }
    } else {
      const songData: SongType = value // new song from data
      if ('msPlayed' in songData) delete songData.msPlayed
      const songPlayData: SongPlayDataType = value
      const newSong = { ...songData, plays: [songPlayData] }
      MappedSpotifyHistory.set(songId, newSong)
    }
  })
  return MappedSpotifyHistory
}

export function sortPlaysHistoryMap(history: HistoryMapType, minListens = 100) {
  return [...history.entries()] // Converts map into array
    .sort((a, b) =>
      a[1].plays === undefined || b[1].plays === undefined
        ? 0
        : a[1].plays.length > b[1].plays.length
        ? -1
        : 1
    )
    .slice(0, 100) // Top 100 songs
    .map((song: [string, SongType]) => song[1])
    .filter(
      (song: SongType) =>
        song && song.plays !== undefined && song.plays.length > minListens
    )
}
