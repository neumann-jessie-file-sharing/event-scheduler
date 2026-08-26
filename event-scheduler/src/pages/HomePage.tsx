import { EventCard } from '../components'
import { sortDateEvents } from '../utils/sortDateEvents'
import {mockEvents} from '../data/mocksEvents'


export function HomePage(){

    const events = sortDateEvents(mockEvents) 
    // TODO: Replace mockEvents with actual data events from function of API call

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