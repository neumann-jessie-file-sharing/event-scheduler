import { Link } from "react-router-dom"

export function NotFoundPage(){
    return(
        <section className="text-center"> 
            <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
            <p className="mt-2 text-base-content/70">The page you are looking for does not exist.</p>
            <Link to="/" className="btn btn-primary mt-6">Back to events</Link>

        </section>
    )
}