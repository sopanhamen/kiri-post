import { PayloadAction } from '@reduxjs/toolkit'
import { fetchStudents } from '@sagaStore/service/student.service'
import {  Student } from '@shared/models/student.model'
import { call, debounce, put, takeLatest } from 'redux-saga/effects'
import { ListParams, ListResponse } from '@shared/interfaces/common'
import { studentActions } from './studentSlice'

function* fetchStudentList(action: PayloadAction<ListParams>) {
    try {
        const response: ListResponse<Student> = yield call(fetchStudents,action.payload)
        yield put(studentActions.fetchStudentListSuccess(response))
    } catch (error) {
        console.log('Failed to fetch student list', error)
        yield put(studentActions.fetchStudentListFailed(error.message))
    }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
    yield put(studentActions.setFilter(action.payload))
}

export default function* studentSaga() {
    yield takeLatest(studentActions.fetchStudentList.type, fetchStudentList)

    yield debounce(
        500,
        studentActions.setFilterWithDebounce.type,
        handleSearchDebounce,
    )
}
