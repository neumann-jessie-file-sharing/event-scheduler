import { useParams , Link , useNavigate} from "react-router-dom"
import { mockEvents } from '../data/mocksEvents'
import { mockCurrentUser } from "../data/mockCurrentUser"


export function EventDetailsPage(){
    const { id: eventId } = useParams()
    const navigate = useNavigate()
    const event = mockEvents.find((event) => event.id === Number(eventId))
    //TODO: Replace mockEvents with actual data events from function of API call
    const isOrganizer = event?.organizerId === mockCurrentUser.id 
    //TODO: Replace with actual user ID from authentication context
    



    async function handleDeleteEvent(){
        if (!event) return
        const confirmed = window.confirm(`Delete event "${event.title}"?`)
        if (!confirmed) return
        
        try {
            console.log(`Deleting event with ID: ${event.id}`)
            //TODO: await deleteEvent(event.id)
            //After successful deletion, navigate back to the events list page
            navigate("/")

        }catch (error) {
            console.error("Error deleting event:", error)
            //show error feedback
        }
    }


    if(!event){
        return(
            <section className="mx-auto max-w-2xl text-center mt-20">
                <h1 className="text-3xl font-bold"> Event not found</h1>
                <Link to="/" className="btn btn-primary mt-6">Back to events</Link>
            </section>
        )
    }

    return(
        <section className="mx-auto max-w-2xl">
            <h1 className="text-3xl font-bold">Event Details</h1>
            <div className="card bg-base-100 shadow-md mt-6">
                <div className="card-body">
                    <h1 className="text-3xl font-bold">{event.title}</h1>
                    <p className="mt-4">{event.description}</p>
                    <div className="mt-6 space-y-2">
                        <p><strong>Date:</strong> {" "} {new Date(event.date).toLocaleDateString()}</p>
                        <p><strong>Location:</strong> {" "} {event.location}</p>
                    </div>
                    <div className="card-actions mt-6 justify-between">
                        <Link to="/" className="btn btn-outline">Back</Link>
                        {isOrganizer && (
                            <div className="flex gap-2">
                                <Link to={`/events/${event.id}/edit`} className="btn btn-secondary">Edit</Link>
                                <button onClick={handleDeleteEvent} className="btn btn-error">Delete</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}