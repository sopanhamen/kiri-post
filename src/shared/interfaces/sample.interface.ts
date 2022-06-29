import 'reflect-metadata'

export namespace SampleNameSpace {
    // can only extend one class
    export class UserModel {
        city: string
        email: string
        phone: string
        username: string
        clan: string

        constructor(data: any) {
            this.city = data.city.name
            this.email = data.email
            this.phone = data.phone.number
            this.username = data.username
            this.clan = data.clan
        }
    }

    export interface IAdditional {
        address: string
        height: number
        weight: number
    }

    // interface/ model without Partial are considered required
    export interface Information
        extends Required<UserModel>,
            Partial<IAdditional> {}

    export interface ISample<T> {
        data: T
    }

    export type PickGetNameAndPhone = Pick<UserModel, 'username' | 'phone'>

    export type OmitClan = Omit<UserModel, 'clan' | 'username'>
}
