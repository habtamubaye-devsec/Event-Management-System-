import axios from "axios";

export const createBooking = async ( data: any) => {
  const response = await axios.post("/api/booking/create-booking", data);
  return response.data; 
};

export const getUserBooking = async () => {
  const response = await axios.get("/api/booking/get-user-booking");
  return response.data; 
};

export const cancelBookings = async (id: string) => {
  const response = await axios.put(`/api/booking/cancel-booking/${id}`);
  return response.data; 
};

// export const deleteBookings = async (id: string) => {
//   const response = await axios.put(`/api/booking/delete-booking/${id}`);
//   return response.data; 
// };


//Admin
export const getAllBooking = async () => {
  const response = await axios.get("/api/booking/get-all-booking");
  return response.data; 
};