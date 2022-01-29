import {PlaysSongType, SongTitleArtistInputType, SongType} from './types'

export function createTitleArtistString({artistName, trackName} : SongTitleArtistInputType): string {
    return `${trackName} by ${artistName}`
}

export function printTop10(history: SongType[]):void {
    console.log(history.slice(0, 10).map((song: SongType, index) => `${index + 1}. ${createTitleArtistString(song)}`))
}

export function printPlaysTop10(history: PlaysSongType[]): void {
    const plays = (({plays}:PlaysSongType)=> plays.slice(0, 10).map((play: SongType)=> `${formatDate(play.endTime)}`))
    console.log(history.slice(0, 10).map((song: PlaysSongType, index) => `${index + 1}. ${createTitleArtistString(song)} \n ${plays(song)}`))
}

export function formatDate(date:string):string {
    const dateObj = new Date(date)
    return `${dateObj.toLocaleTimeString('en-US')} ${dateObj.toLocaleString('en-US')}`
}