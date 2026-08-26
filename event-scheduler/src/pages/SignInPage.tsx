import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import type { SignInUserFormData } from "../types"
import { saveToken } from "../services/tokenStorage"


export function SignInPage(){

    const {register, handleSubmit, formState:{ errors, isSubmitting } } = useForm<SignInUserFormData>()

    async function onSubmit(data: SignInUserFormData){
        console.log(data)
        //TODO API 
        // Function of API - Post request to the API to create a new user with the provided data

        //const response = await login(data)
        saveToken(response.data.token) //TODO: Replace with the actual token from the API response
        //TODO: Save the token in local storage
    }

    return(
        <section className="mx-auto w-full max-w-md px-4 pt-8">
            <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                    <div className="mb-4">
                        <h1 className="text-3xl font-bold">Sign In</h1>
                        <p className="mt-2 text-base-content/70">Sign in to your account and manage your events</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email</legend>
                            <input type="email" placeholder="youremail@example.com" className={`input w-full ${errors.email ? "input-error": ""}`} {...register("email", {required: "Email is required", pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address"}})}/>
                            {errors.email && <p className="text-error text-sm">{errors.email.message}</p>}
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input type="password" placeholder="Password" className={`input w-full ${errors.password ? "input-error": ""}`} {...register("password", {required: "Password is required"})}/>
                            {errors.password && <p className="text-error text-sm">{errors.password.message}</p>}
                        </fieldset>
                        <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Signing In..." : "Sign In"}
                        </button>

                        <p className="text-center text-sm text-base-content/70">
                            Don't have an account? <Link to="/signup" className="font-medium text-primary hover:underline">Sign Up</Link>
                        </p>
                        
                    </form>


                </div>
            </div>  
        </section>
    )
}