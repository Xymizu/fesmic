import api from "./api";

export const eventService = {
  // Get all events with optional filters
  getEvents: (params) => api.get("/events", { params }),

  // Get event by ID
  getEventById: (id) => api.get(`/events/${id}`),

  // Get upcoming events
  getUpcomingEvents: (limit = 8) =>
    api.get("/events/upcoming", { params: { limit } }),

  // Get featured event
  getFeaturedEvent: () => api.get("/events/featured"),

  // Search events
  searchEvents: (query) => api.get("/events/search", { params: { q: query } }),
};
