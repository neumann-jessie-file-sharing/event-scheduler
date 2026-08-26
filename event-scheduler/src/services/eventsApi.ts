import type { CreateEventFormData, Event } from "../types"
import { getToken } from "./tokenStorage"

const BASE_URL = "http://localhost:3001"

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