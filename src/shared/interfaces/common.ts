export interface CommonState {
    isFetching: boolean
    isSubmitting: boolean
}

export interface Pagination {
    offset: number
    limit: number
}

export interface IArrayProps<T> {
    payload: T[]
}

export interface IProps<T> {
    payload: T
}

export interface IActionReturnType<T> {
    payload: T
    type: string
}

export interface ITableHeader {
    name?: string
    class?: string
    style?: Object
}

export interface PaginationParams {
    _limit: number
    _page: number
    _totalRows: number
}

export interface ListResponse<T> {
    data: T[]
    pagination: PaginationParams
}

export interface ListParams {
    _page?: number
    _limit?: number
    _sort?: string
    _order?: 'asc' | 'desc'

    [key: string]: any
}
