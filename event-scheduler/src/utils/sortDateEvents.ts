import type { Event } from '../types'

export function sortDateEvents(events: Event[]){
    return [...events].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}