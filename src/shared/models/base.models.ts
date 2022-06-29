import { slugify } from '../utils/common'

export class BaseModel {
    id: string
    name: string
    slug: string

    constructor(data: any) {
        this.id = data.id
        this.name = data.name
        this.slug = slugify(data.name)
    }
}
