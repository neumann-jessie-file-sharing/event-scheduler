import type { CreateEventFormData, Event, EventsResponse, User } from "../types"
import { getToken } from "./tokenStorage"

const BASE_URL = "http://localhost:3001"

// added by Jessie
export async function getEvents(): Promise<EventsResponse> {
  const response = await fetch(`${BASE_URL}/api/events`)

  if (!response.ok) {
    throw new Error(`Failed to load events (${response.status})`)
  }

  return response.json()
}

export async function createEvent(
  eventData: CreateEventFormData
): Promise<Event> {
  const token = getToken()

  if (!token) {
    throw new Error("You must be logged in to create an event")
  }

  const response = await fetch(`${BASE_URL}/api/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.error ||
      `Failed to create event (${response.status})`
    )
  }

  return data
}

export async function getEventById(id: number): Promise<Event> {
  const response = await fetch(`${BASE_URL}/api/events/${id}`)

  if (!response.ok) {
    throw new Error(`Failed to load event (${response.status})`)
  }

  return response.json()
}

// added by Jessie
export async function updateEvent(
  id: number,
  eventData: Partial<CreateEventFormData>
): Promise<Event> {
  const token = getToken()

  if (!token) {
    throw new Error("You must be logged in to update an event")
  }

  const response = await fetch(`${BASE_URL}/api/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.error ||
      `Failed to update event (${response.status})`
    )
  }

  return data
}

// added by Jessie
export async function deleteEvent(id: number): Promise<void> {
  const token = getToken()

  if (!token) {
    throw new Error("You must be logged in to delete an event")
  }

  const response = await fetch(`${BASE_URL}/api/events/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to delete event (${response.status})`)
  }
}

export async function getProfile(): Promise<User> {
  const token = getToken()

  if (!token) {
    throw new Error("No authentication token")
  }

  const response = await fetch(
    `${BASE_URL}/api/auth/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(
      `Failed to load profile (${response.status})`
    )
  }

  return response.json()
}
