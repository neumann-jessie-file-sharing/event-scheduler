import { createBrowserRouter } from "react-router-dom"
import { HomePage, EventDetailsPage, CreateEventPage, EditEventPage, NotFoundPage, SignInPage, SignUpPage } from "../pages"
import { RootLayout, ProtectedLayout } from "../layouts"


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { 
                index: true,
                element: <HomePage />
            
            },
            {
                path: "/events/:id",
                element: <EventDetailsPage />
            },
            {
                path: "signup",
                element: <SignUpPage />
            },
            {
                path: "signin",
                element: <SignInPage />
            },
            {
                element: <ProtectedLayout />,
                children: [
                    {
                        path: "events/create",
                        element: <CreateEventPage />
                    },
                    {
                        path: "events/:id/edit",
                        element: <EditEventPage />
                    }
                ]
            },
            {
                path: "*",
                element: <NotFoundPage />
            }
        ]
    }
])