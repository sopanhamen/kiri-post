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
