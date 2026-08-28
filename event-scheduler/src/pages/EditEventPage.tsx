import { useEffect, useState } from "react"
import { useNavigate, useParams, Navigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import type { CreateEventFormData, Event } from "../types"
import { updateEvent, getEventById } from "../services/eventsApi" // added by Jessie



export function EditEventPage(){
    const { id: eventId } = useParams()
    const navigate = useNavigate()
    const { isLoggedIn, user } = useAuth()
    const { register, handleSubmit, reset, formState:{ errors, isSubmitting } } = useForm<CreateEventFormData>()

    const [event, setEvent] = useState<Event | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchEvent() {
            if (!eventId) {
                setError("Invalid event ID")
                setIsLoading(false)
                return
            }
            try {
                setIsLoading(true)
                setError(null)
                const fetchedEvent = await getEventById(Number(eventId))
                setEvent(fetchedEvent)
                reset({
                    title: fetchedEvent.title,
                    description: fetchedEvent.description,
                    date: fetchedEvent.date.slice(0, 16),
                    location: fetchedEvent.location,
                    latitude: fetchedEvent.latitude,
                    longitude: fetchedEvent.longitude,
                })
            
            } catch (error) {
                console.error(error)
                setError(error instanceof Error ? error.message : "Failed to fetch event")
            } finally {
                setIsLoading(false)
            }
        }
        fetchEvent()
    }, [eventId, reset])


    async function onSubmit(data: CreateEventFormData){
        if(!event) return

        const eventData = {
            ...data,
            latitude: Number.isNaN(data.latitude) ? undefined : data.latitude,
            longitude: Number.isNaN(data.longitude) ? undefined : data.longitude,
        }

        try {
            setError(null)

            // added by Jessie
            await updateEvent(event.id, eventData)

            navigate(`/events/${event.id}`)
        } catch (error) {
            console.error(error)
            setError(error instanceof Error ? error.message : "Failed to update event")
        }
    }

    if(isLoading) {
        return (
            <section className="mx-auto max-w-2xl">
                <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                <div className="skeleton h-8 w-1/2" />

                <div className="skeleton mt-4 h-12 w-full" />
                <div className="skeleton h-24 w-full" />
                <div className="skeleton h-12 w-full" />
                <div className="skeleton h-12 w-full" />
                </div>
                </div>  
        </section>
        )
    }

    
     if (error && !event) {
    return (
      <section className="mx-auto max-w-2xl">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </section>
    )
  }

  if (!event) {
    return (
      <section className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold">
          Event not found
        </h1>
      </section>
    )
  }

  const canManageEvent =
    isLoggedIn &&
    user?.id === event.organizerId

    
    if (!canManageEvent) {
        return <Navigate to={`/events/${event.id}`} replace />
    }
    return (
        <section className="mx-auto max-w-2xl p-4">
            <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                    <h1 className="text-3xl font-bold">Edit Event</h1>
                    {error && (
                         <div className="alert alert-error mt-4">
                         <span>{error}</span>
                        </div>
                    )}

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