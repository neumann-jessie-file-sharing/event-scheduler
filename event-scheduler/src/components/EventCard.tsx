import { Link } from 'react-router-dom'
import type{ Event } from '../types'

type EventCardProps ={ 
    event: Event
}

export function EventCard({event}: EventCardProps){

   const formattedDate = new Date(event.date).toLocaleString()

    return(
        <article className="card min-h-72 border border-base-300 bg-base-100 shadow-sm">
            <div className="card-body">
                <h2 className="card-title">{event.title}</h2>
                <p className="text-base-content/70">{event.description}</p>
                <div className="mt-3 space-y-1 text-sm">
                    <p><strong>Date:</strong> {formattedDate}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                </div>
                <div className="card-action mt-4 justify-end">
                    <Link to={`/events/${event.id}`} className="btn btn-primary">View Details</Link>
                </div>
            </div>
        </article>
    )
}