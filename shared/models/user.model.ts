import { BaseModel } from './base.models'

export class UserProfile extends BaseModel {
    city: string
    email: string
    phone: string
    username: string
    // added for update and upsert purposes
    clan: string

    constructor(data: any) {
        super(data)
        this.city = data.address?.city
        this.email = data.email
        this.phone = data.phone
        this.username = data.username
        this.clan = data.clan
    }
}
