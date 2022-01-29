import { SpotifyHistory } from "./spotify_data"
import { SongTitleArtistInputType, PlaysHistoryMapType, OGSongType, SongType, PlaysSongType } from './types'
import { createTitleArtistString } from "./utils"

// get all listens of a specific song
// 

// This file works with the song data ranked by listen count
export function createPlaysHistoryMap(){
    const MappedSpotifyHistory: PlaysHistoryMapType = new Map()
    SpotifyHistory.forEach((value: OGSongType) => {
        if ( value.msPlayed < 60000){ 
            return // Filters out listens < 1 minute
        }
        const songId = createTitleArtistString(value)
        if (MappedSpotifyHistory.has(songId)){
            const song = MappedSpotifyHistory.get(songId)
            // This is to placate the TS compiler with Map methods
            // We already check if song exists above, so it will always be present
            if (song) {
                if ('plays' in song){
                    const songData: SongType = value
                    if ('msPlayed' in songData) delete songData.msPlayed
                    const plays: SongType[] = [...song.plays, value]
                    MappedSpotifyHistory.set(songId, {plays, ...songData})
                }
            }
        }
        else {
            const songData: SongType = value
            if ('msPlayed' in songData) delete songData.msPlayed
            const newSong = {...songData, plays: [value]}
            MappedSpotifyHistory.set(songId, newSong)
        }
    })
    return MappedSpotifyHistory
}

export function sortPlaysHistoryMap(history: PlaysHistoryMapType, minListens = 100) {
    return [...history.entries()] // Converts map into array
    .sort((a, b) => a[1].plays.length > b[1].plays.length ? -1 : 1)
    .map((song: [string, PlaysSongType]) => song[1])
    .filter((song: PlaysSongType) => song && song.plays.length > minListens)
    .slice(0, 100)
}