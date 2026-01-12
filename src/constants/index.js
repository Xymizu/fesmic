// API Base URL
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// Event categories
export const EVENT_CATEGORIES = [
  { value: "concert", label: "Concert" },
  { value: "festival", label: "Festival" },
  { value: "sport", label: "Sport" },
  { value: "conference", label: "Conference" },
  { value: "exhibition", label: "Exhibition" },
  { value: "other", label: "Other" },
];

// Payment methods
export const PAYMENT_METHODS = [
  { value: "qris", label: "QRIS" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "e_wallet", label: "E-Wallet" },
  { value: "credit_card", label: "Credit Card" },
];

// Ticket categories
export const TICKET_CATEGORIES = [
  { value: "vip", label: "VIP" },
  { value: "regular", label: "Regular" },
  { value: "festival", label: "Festival" },
  { value: "presale", label: "Presale" },
];

// Routes
export const ROUTES = {
  HOME: "/",
  EVENTS: "/events",
  EVENT_DETAIL: "/events/:id",
  LOGIN: "/login",
  REGISTER: "/register",
  CHECKOUT: "/checkout/:eventId",
  ABOUT: "/about",
};
