export type Event = {
    id: number
    title: string
    description?: string
    date: string
    location: string
    latitude?: number
    longitude?: number
    organizerId: number
    createdAt?: string
    updatedAt?: string

}

export type CreateEventFormData = {
    title: string
    description?: string
    date: string
    location: string
    latitude?: number
    longitude?: number
}

export type UpdateEventFormData = {
    title?: string
    description?: string
    date?: string
    location?: string
    latitude?: number
    longitude?: number

}