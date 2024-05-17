export interface IPagination {
  pageNumber: number
  pageSize: number
  count: number
  data: IProducts[]
}

export interface IProducts {
  id: number
  categoryName: string
  productPicture: any
  name: string
  description: string
  price: number
}
