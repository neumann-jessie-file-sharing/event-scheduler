import { useForm } from "react-hook-form"
import { Link, useNavigate, useLocation } from "react-router-dom"
import type { SignInUserFormData } from "../types"
import { useAuth } from "../context/AuthContext"


export function SignInPage(){

    const {register, handleSubmit, formState:{ errors, isSubmitting } } = useForm<SignInUserFormData>()
    const { login } = useAuth()

    // added by Jessie
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    async function onSubmit(data: SignInUserFormData){
        console.log(data)

        // added by Jessie
        const response = await fetch("http://localhost:3001/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        // added by Jessie
        if (!response.ok) {
            throw new Error("Login failed")
        }

        // added by Jessie
        const responseData = await response.json()

        // added by Jessie
        login(responseData.token)
        navigate(from, { replace: true })
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