import { useNavigate, useParams, Navigate } from "react-router-dom"
import { mockCurrentUser } from "../data/mockCurrentUser"
import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { mockEvents } from "../data/mocksEvents"
import type { CreateEventFormData } from "../types"


export function EditEventPage(){
    const { id: eventId } = useParams()
    const navigate = useNavigate()
    const { isLoggedIn } = useAuth()

    const event = mockEvents.find((event) => event.id === Number(eventId))
    //TODO: Replace mockEvents with actual data events from function of API call

    const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm<CreateEventFormData>({
        defaultValues: event ? {
            title: event.title,
            description: event.description,
            date: event.date.slice(0, 16),
            location: event.location,
            latitude: event.latitude,
            longitude: event.longitude
        } : undefined
    })

    async function onSubmit(data: CreateEventFormData){
        if(!event) return

        const eventData = {
            ...data,
            latitude: Number.isNaN(data.latitude) ? undefined : data.latitude,
            longitude: Number.isNaN(data.longitude) ? undefined : data.longitude,
        }

        try {
            console.log(eventData)
            //TODO: await updateEvent(event.id, eventData)
            navigate(`/events/${event.id}`)
        } catch (error) {
            console.error(error)
        }
    }

    if(!event) {
        return (
            <section className="mx-auto max-w-2xl p-4">
                <div className="card bg-base-100 shadow-md">
                    <div className="card-body">
                        <h1 className="text-3xl font-bold">Event not found</h1>
                        <p className="mt-2 text-base-content/70">The event you are trying to edit does not exist.</p>
                    </div>
                </div>
            </section>
        )
    }
    const canManageEvent = isLoggedIn && event.organizerId === mockCurrentUser.id
    //TODO: Replace with actual user ID from authentication context
    if (!canManageEvent) {
        return <Navigate to={`/events/${event.id}`} replace />
    }
    return (
        <section className="mx-auto max-w-2xl p-4">
            <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                    <h1 className="text-3xl font-bold">Edit Event</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Title</legend>
                            <input type="text" placeholder="Event title" className={`input w-full ${errors.title ? 'input-error' : ''}`} {...register("title", { required: "Title is required" })}/>
                            {errors.title && <p className="text-error text-sm mt-1">{errors.title.message}</p>}
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Description</legend>
                            <textarea placeholder="Event description" className="textarea min-h-32 w-full" {...register("description")}/>
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Date and time</legend>
                            <input type="datetime-local" className={`input w-full ${errors.date ? "input-error" : ""}`} {...register("date", { required: "Date and time is required" })}/>
                            {errors.date && <p className="text-error text-sm mt-1">{errors.date.message}</p>}
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Location</legend>
                            <input type="text" placeholder="Event location" className={`input w-full ${errors.location ? "input-error" : ""}`} {...register("location", { required: "Location is required" })}/>
                            {errors.location && <p className="text-error text-sm mt-1">{errors.location.message}</p>}
                        </fieldset>
                        <div className="flex gap-3">
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save Changes"}</button>
                            <button type="button" className="btn btn-ghost" onClick={() => navigate(`/events/${event.id}`)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}