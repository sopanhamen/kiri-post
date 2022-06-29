// SOURCE: https://jsonplaceholder.typicode.com/

import { UserProfile } from 'src/shared/models/user.model'

const URL = 'https://jsonplaceholder.typicode.com/users'

export async function getProfileList() {
    const res = await fetch(`${URL}`, {
        method: 'GET',
    })

    return res.json()
}

export async function getProfileById(id: string) {
    const res = await fetch(`${URL}/${id}`, {
        method: 'GET',
    })

    return res.json()
}

export async function createProfile(payload: UserProfile) {
    const res = await fetch(`${URL}`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })

    return res.json()
}
