import { useEffect, useState } from "react" // added by Jessie
import { EventCard, EventListSkeleton } from '../components'
import { sortDateEvents } from '../utils/sortDateEvents'
import type { Event } from "../types" // added by Jessie
import { getEvents } from "../services/eventsApi" // added by Jessie
import { Link } from "react-router-dom"


export function HomePage(){

    // added by Jessie
    const [apiEvents, setApiEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    // added by Jessie
    useEffect(() => {
        async function loadEvents(){
            try {
                setLoading(true)
                setError(null)
                const data = await getEvents()
                setApiEvents(data.results)
            } catch (error) {
                console.error("Failed to load events:", error)
                const message = error instanceof Error ? error.message : "Failed to load events"
                setError(message)
            } finally {
                setLoading(false)
            }
        }

        loadEvents()
    }, [])

    const events = sortDateEvents(apiEvents) // adapted by Jessie

    return(
        <section>
            <h1 className="text-3xl font-bold">Events</h1>
            <p className="mt-2 text-base-content/70">Discover upcoming events in your area.</p>

            {loading ? (
                <EventListSkeleton />
            ) : error ? (
                <div className="alert alert-error mt-8">
                     <span>Could not load events: {error}</span>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            )}
            {!loading && !error && events.length === 0 && (
                <div className="mt-8 rounded-2xl border border-base-300 bg-base-100 p-10 text-center shadow-sm">
                    <h2 className="mt-4 text-xl font-bold">No events yet</h2>
                    <p className="mt-2 text-base-content/60">There are no upcoming events available.</p>
                    <Link to="/events/create" className="btn btn-primary mt-6">Create the first event</Link>
                </div>
            )}
        </section>
    )
}