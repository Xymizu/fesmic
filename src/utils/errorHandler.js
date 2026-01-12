import { message } from "antd";

export const handleApiError = (error) => {
  if (error.response) {
    // BE return error response
    const { status, data } = error.response;

    switch (status) {
      case 400:
        message.error(data.message || "Bad request");
        break;
      case 401:
        message.error("Unauthorized. Please login again.");
        break;
      case 403:
        message.error("Forbidden. You don't have access.");
        break;
      case 404:
        message.error("Resource not found");
        break;
      case 500:
        message.error("Server error. Please try again later.");
        break;
      default:
        message.error(data.message || "Something went wrong");
    }
  } else if (error.request) {
    // Request dibuat tapi tidak ada response
    message.error("Network error. Please check your connection.");
  } else {
    // Error lainnya
    message.error("An unexpected error occurred");
  }

  return error;
};
