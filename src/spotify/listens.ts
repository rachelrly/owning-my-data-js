import { SpotifyHistory } from "./spotify_data"
import { SongTitleArtistInputType, HistoryMapType, SongHistoryType } from './types'

export function createHistoryMap(){
    const MappedSpotifyHistory: HistoryMapType = new Map()
    SpotifyHistory.forEach((value) => {
        const songId = createTitleArtistString(value)
        if (MappedSpotifyHistory.has(songId)){
            const song = MappedSpotifyHistory.get(songId)
            // This is to placate the TS compiler
            // We check if it is present with the Map.has above
            // So it will ALWAYS be present at this point
            if (song && song.song.msPlayed > 100) MappedSpotifyHistory.set(songId, {listens: song.listens + 1, song: song.song})
        }
        else MappedSpotifyHistory.set(songId, {listens: 1, song: value})
    })
    console.log(sortHistoryMap(MappedSpotifyHistory))
    return MappedSpotifyHistory
}

function createTitleArtistString({artistName, trackName} : SongTitleArtistInputType): string {
    return `${trackName} by ${artistName}`
}

export function sortHistoryMap(history: HistoryMapType, minListens = 100) {
    // should also filter and just return the song, not the object for filtering
    return [...history.entries()]
    .sort((a, b) => a[1].listens > b[1].listens ? -1 : 1)
    .filter((song: [string, SongHistoryType]) => song[1].listens > 100)
    .map((song: [string, SongHistoryType]) => ({...song[1].song, listens: song[1].listens}))
    .slice(minListens)
}