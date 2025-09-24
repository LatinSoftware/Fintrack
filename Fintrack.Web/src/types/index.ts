export * from './account'
export * from './category'
export * from './transactions'

export interface PaginationMetadata {
  total: number
  limit: number
  offset: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface PaginationResponse<T> {
  meta: PaginationMetadata
  data: T[]
}
