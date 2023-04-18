export interface ISeriesRecord {
  records: Array<ISeries>
}

export interface ISeries {
  id: number
  seriesName: string
  seriesDsc: string
  uploadUserName: string
  updateTime: string
  allImages: Array<string>
  hasDelete: boolean
  categoryName: string
  categoryId: number
}

export interface ICategoryRecord {
  list: Array<ICategory>
}

export interface ICategory {
  id: number
  categoryName: string
}
