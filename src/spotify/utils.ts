import { SongPlayDataType, SongTitleArtistInputType, SongType } from './types'

export function createTitleArtistString({
  artistName,
  trackName
}: SongTitleArtistInputType): string {
  return `${trackName} by ${artistName}`
}

export function printTop10(history: SongType[]): void {
  console.log(
    history
      .slice(0, 10)
      .map(
        (song: SongType, index) =>
          `${index + 1}. ${createTitleArtistString(song)}`
      )
  )
}

export function printPlaysTop10(history: SongType[]): void {
  function logPlays({ plays }: SongType) {
    if (plays)
      plays
        .slice(0, 10)
        .map((play: SongPlayDataType) => console.log(formatDate(play.endTime)))
  }

  history.slice(0, 10).forEach((song: SongType, index) => {
    console.log(`${index + 1}. ${createTitleArtistString(song)}`)
    logPlays(song)
  })
}

export function formatDate(date: string): string {
  const dateObj = new Date(date)
  return `${dateObj.toLocaleTimeString('en-US')} ${dateObj.toLocaleString(
    'en-US'
  )}`
}
