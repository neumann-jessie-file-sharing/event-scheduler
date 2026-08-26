import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import type { SignUpUserFormData } from "../types"

export function SignUpPage(){

    const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm<SignUpUserFormData>()

    async function onSubmit(data: SignUpUserFormData){
        console.log(data)
        //TODO API 
        // Function of API - Post request to the API to create a new user with the provided data
    }

    return(
        <section className="mx-auto max-w-md">
            <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold">Create Account</h1>
                    <p className="mt-2 text-base-content/70">Sign up to create and manage events</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Name</legend>
                        <input type="text" placeholder="Name" className={`input w-full ${errors.name ? "input-error": ""}`} {...register("name", {required: "Name is required", minLength: {value: 2, message: "Name must be at least 2 characters long"}})}/>
                        {errors.name && <p className="text-error text-sm">{errors.name.message}</p>}
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email</legend>
                        <input type="email" placeholder="youremail@example.com" className={`input w-full ${errors.email ? "input-error": ""}`} {...register("email", {required: "Email is required", pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address"}})}/>
                        {errors.email && <p className="text-error text-sm">{errors.email.message}</p>}
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <input type="password" placeholder="Password" className={`input w-full ${errors.password ? "input-error": ""}`} {...register("password", {required: "Password is required", minLength: {value: 6, message: "Password must be at least 6 characters long"}})}/>
                        {errors.password && <p className="text-error text-sm">{errors.password.message}</p>}
                    </fieldset>
                    <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Creating Account..." : "Create Account"}
                    </button>
                    <p className="text-center text-sm text-base-content/70">
                        Already have an account? <Link to="/signin" className="font-medium text-primary hover:underline">Sign In</Link>
                    </p>
                </form>


            </div>
            </div>
        </section>
    )
}