export function slugify(name: string) {
    return name.split(' ').join('-').toLowerCase()
}
