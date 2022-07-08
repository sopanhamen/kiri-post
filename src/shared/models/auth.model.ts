import { BaseModel } from './base.models'

export interface IUser {
    firstName?: string
    lastName?: string
}
export interface ILogin {
    username: string,
    password: string
}

export class AuthProfile extends BaseModel {
    email: string
    password: string
    publicToken?: string
    accessToken?: string
    user?: IUser
    backUrl?: string

    constructor(data: any) {
        super(data)
        this.email = data.email
        this.password = data.password
    }
}

export interface IAuthorize {
    token?: string
}
