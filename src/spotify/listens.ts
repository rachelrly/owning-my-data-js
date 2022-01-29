import { SpotifyHistory } from "./spotify_data"
import { SongTitleArtistInputType } from './types'



export function createHistoryMap(){
    const MappedSpotifyHistory: Map<string, number> = new Map()

    SpotifyHistory.forEach((value) => {
        const songId = createTitleArtistString(value)
        if (MappedSpotifyHistory.has(songId)){
            const listens = MappedSpotifyHistory.get(songId)
            // This is to placate the TS compiler
            // We check if it is present with the Map.has above
            // So it will ALWAYS be present at this point
            if (listens) MappedSpotifyHistory.set(songId, listens + 1)
        }
        else MappedSpotifyHistory.set(songId, 1)
    })
    return MappedSpotifyHistory
}


function createTitleArtistString({artistName, trackName} : SongTitleArtistInputType): string {
    return `${trackName} by ${artistName}`
}