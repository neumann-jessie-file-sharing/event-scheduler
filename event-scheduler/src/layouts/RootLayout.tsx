import { Link, Outlet } from "react-router-dom"



export function RootLayout(){
    return(
        <div className="min-h-screen bg-base-200">
            <header className="navbar border-b border-base-300 bg-base-100">
                <div className="mx-auto flex w-full max-w-6xl">
                    <div className="flex-1">
                        <Link to="/" className="text-xl font-bold text-primary">Event Scheduler</Link>
                    </div>
                    <nav className="flex gap-2">
                        <Link to="/" className="btn btn-ghost">Events</Link>
                        <Link to="/events/create" className="btn btn-ghost">Create Event</Link>
                        <Link to="/signin" className="btn btn-ghost">Sign In</Link>
                        <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                    </nav>
                </div>
            </header>
            <main className="mx-auto w-full max-w-6xl p-6">
                <Outlet />
            </main>
        </div>
    )
}

