import { useEffect, useState } from "react" // added by Jessie
import { EventCard } from '../components'
import { sortDateEvents } from '../utils/sortDateEvents'
import type { Event } from "../types" // added by Jessie
import { getEvents } from "../services/eventsApi" // added by Jessie


export function HomePage(){

    // added by Jessie
    const [apiEvents, setApiEvents] = useState<Event[]>([])

    // added by Jessie
    useEffect(() => {
        async function loadEvents(){
            const data = await getEvents()
            setApiEvents(data)
        }

        loadEvents()
    }, [])

    const events = sortDateEvents(apiEvents) // adapted by Jessie

    return(
        <section>
            <h1 className="text-3xl font-bold">Events</h1>
            <p className="mt-2 text-base-content/70">Discover upcoming events in your area.</p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}

            </div>
        </section>
    )
}