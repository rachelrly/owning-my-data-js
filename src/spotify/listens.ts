import { SpotifyHistory } from "./spotify_data"
import { SongTitleArtistInputType } from './types'



export function createHistoryMap(){
    const MappedSpotifyHistory:any = {}

    SpotifyHistory.forEach((value) => {
        const songId = createTitleArtistString(value)
        if (songId in MappedSpotifyHistory){
            MappedSpotifyHistory[songId] = MappedSpotifyHistory[songId] + 1
        }
        else MappedSpotifyHistory[songId] = 1
    })
    console.log('THESE ARE MY VALUES', MappedSpotifyHistory)
    return MappedSpotifyHistory
}


function createTitleArtistString({artistName, trackName} : SongTitleArtistInputType): string {
    return `${trackName} by ${artistName}`
}