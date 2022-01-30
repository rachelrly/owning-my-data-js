import {
  printPlaysTop10,
  sortPlaysHistoryMap,
  createPlaysHistoryMap,
  SpotifyHistory,
  SongType,
  logSong,
  getSongFromHistoryArray
} from './spotify'

// Logs song rank, title, and artist of songs with top 10 listens
// printPlaysTop10(sortPlaysHistoryMap(createPlaysHistoryMap()))
// printTop10(sortListensHistoryMap(createListensHistoryMap()))

Logs plays of most recently played song
const history = sortPlaysHistoryMap(createPlaysHistoryMap())
const find = SpotifyHistory[0]
const song = getSongFromHistoryArray(history, find)
if (song !== undefined) logSong(song)
