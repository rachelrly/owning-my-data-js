export interface ChartDatasetType {
  label: string
  data: number[]
  backgroundColor: string[]
  borderColor?: string[]
  borderWidth?: number
}

export interface ChartDataType {
  labels: string[]
  datasets: ChartDatasetType[]
}
