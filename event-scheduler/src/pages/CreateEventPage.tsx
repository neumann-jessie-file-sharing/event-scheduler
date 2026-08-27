import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import type { CreateEventFormData } from "../types"
import { createEvent } from "../services/eventsApi" // added by Jessie


export function CreateEventPage(){

    const {register, handleSubmit, reset, formState:{ errors, isSubmitting}} = useForm<CreateEventFormData>()
    const navigate = useNavigate()

    async function onSubmit(data: CreateEventFormData){

        const eventData = {
            ...data,
            latitude: Number.isNaN(data.latitude) ? undefined : data.latitude,
            longitude: Number.isNaN(data.longitude) ? undefined : data.longitude,   
        }

        try {
            console.log(eventData)

            // added by Jessie
            await createEvent(eventData)

            //Later, only after API call is successful, navigate to the events list page
            navigate("/")

            reset()

        }catch (error) {
            console.error("Error creating event:", error)
            //show error feedback
        }       
        
    }
    return(
        <section className="mx-auto max-w-2xl p-4">
            <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                    <div className="mb-4">
                        <h1 className="text-3xl font-bold">Create Event</h1>
                        <p className="mt-2 text-base-content/70">Add a new event to your schedule</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Title</legend>
                            <input type="text" placeholder="Event title" className={`input w-full ${errors.title ? 'input-error' : ''}`} {...register("title", { required: "Title is required", minLength: { value: 3, message: "Title must be at least 3 characters" } })}/>
                            {errors.title && <p className="text-error text-sm mt-1">{errors.title.message}</p>}
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Description</legend>
                            <textarea placeholder="Event description" className="textarea min-h-32 w-full" {...register("description")}/>        
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Date and time</legend>
                            <input type="datetime-local" className={`input w-full ${errors.date ? "input-error" : ""}`} {...register("date", {required: "Date and time is required", validate: (value)=> {const selectedDate = new Date(value); const now = new Date(); return ( selectedDate > now || "Event date must be in the future")}, })}/>
                             {errors.date && <p className="text-error text-sm mt-1">{errors.date.message}</p>}
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Location</legend>
                            <input type="text" placeholder="Event location" className={`input w-full ${errors.location ? "input-error" : ""}`} {...register("location", { required: "Location is required" })}/>
                            {errors.location && <p className="text-error text-sm mt-1">{errors.location.message}</p>}
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Latitude</legend>
                            <input type="number" step="any" placeholder="52.5200" className={`input w-full ${errors.latitude ? "input-error" : ""}`} {...register("latitude", { valueAsNumber: true, min: { value: -90, message: "Minimum latitude is -90" }, max: { value: 90, message: "Maximum latitude is 90" } })}/>
                            {errors.latitude && <p className="text-error text-sm mt-1">{errors.latitude.message}</p>}
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Longitude</legend>
                            <input type="number" step="any" placeholder="13.4050" className={`input w-full ${errors.longitude ? "input-error" : ""}`} {...register("longitude", { valueAsNumber: true, min: { value: -180, message: "Minimum longitude is -180" }, max: { value: 180, message: "Maximum longitude is 180" } })}/>
                            {errors.longitude && <p className="text-error text-sm mt-1">{errors.longitude.message}</p>}
                        </fieldset>
                        <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>{isSubmitting ? "Creating..." : "Create Event"}</button>
                    </form>
                </div>
            </div>
            
        </section>
    )
}