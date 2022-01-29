import { SpotifyHistory } from "./spotify_data"
import { SongTitleArtistInputType, HistoryMapType, OGSongType, SongType, CountedSongType } from './types'


export function createHistoryMap(){
    const MappedSpotifyHistory: HistoryMapType = new Map()
    SpotifyHistory.forEach((value: OGSongType) => {
        if ( value.msPlayed < 10000){ 
            return // Filters out listens < 10 seconds
        }
        const songId = createTitleArtistString(value)
        if (MappedSpotifyHistory.has(songId)){
            const song = MappedSpotifyHistory.get(songId)
            // This is to placate the TS compiler
            // We check if it is present with the Map.has above
            // So it will ALWAYS be present at this point
            if (song && 'listens' in song){
                const storeSong: SongType = value
                if ('msPlayed' in storeSong) delete storeSong.msPlayed
                MappedSpotifyHistory.set(songId, {listens: song.listens + 1, ...storeSong})
            }
        }
        else MappedSpotifyHistory.set(songId, {listens: 1, ...value})
    })
   //  console.log(sortHistoryMap(MappedSpotifyHistory))
    return MappedSpotifyHistory
}

function createTitleArtistString({artistName, trackName} : SongTitleArtistInputType): string {
    return `${trackName} by ${artistName}`
}

export function sortHistoryMap(history: HistoryMapType, minListens = 100) {
    return [...history.entries()] // Converts map into array
    .sort((a, b) => a[1].listens > b[1].listens ? -1 : 1)
    .map((song: [string, CountedSongType]) => song[1])
    .filter((song: CountedSongType) => song.listens > 100)
    .slice(0, minListens)
}