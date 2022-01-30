import { sortPlaysHistoryMap, createPlaysHistoryMap } from '../plays'
import { createTitleArtistString } from '../utils'

import { ChartDataType, SongType } from '../types'

const history = sortPlaysHistoryMap(createPlaysHistoryMap()).slice(0, 20)

const labels = history.map((song: SongType) => createTitleArtistString(song))
const dataset = history.map((song: SongType) =>
  song.plays !== undefined ? song.plays.length : 1
)

// interface GenericType<A, T> {
//   [A: string]: T
// }

export const data: ChartDataType = {
  labels,
  datasets: [
    {
      label: 'total listens',
      data: dataset,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }
  ]
}
