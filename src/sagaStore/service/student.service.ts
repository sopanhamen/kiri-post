import { ListParams } from '@shared/interfaces/common'
import { Student } from '@shared/models/student.model'
import api from '@shared/services/api.service'

// import { ListResponse, Student } from './../models';

const STUDENT = '/students'
export const fetchStudents = async (params: ListParams) => {
    try {
        const res = await api.get(STUDENT, { params: { params } })
        return { res, isError: true }
    } catch (error) {
        return { error, isError: true }
    }
}

export const fetchStudentById = async (id: string) => {
    try {
        const res = await api.get(`${STUDENT}/${id}`)
        return { res, isError: true }
    } catch (error) {
        return { error, isError: true }
    }
}

export const AddStudent = async (payload: Student) => {
    try {
        const res = await api.post(STUDENT, { payload })
        return { res, isError: false }
    } catch (error) {
        return { error, isError: true }
    }
}

export const UpdateStudent = async (payload: Partial<Student>) => {
    try {
        const res = await api.patch(`${STUDENT}/${payload?.id}`, payload)
        return { res, isError: false }
    } catch (error) {
        return { error, isError: true }
    }
}

export const RemoveStudent = async (id: string) => {
    try {
        const res = await api.delete(`${STUDENT}/${id}`)
        return { res, isError: false }
    } catch (error) {
        return { error, isError: true }
    }
}
