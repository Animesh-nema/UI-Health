import axios from "axios";

const API_URL = "http://127.0.0.1:5000"; // Replace with your actual backend URL

const ApiService = {
  getAllNurses: async () => {
    try {
      const response = await axios.get(`${API_URL}/nurse`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching nurses");
    }
  },
  getNurseById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/nurse/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching nurse");
    }
  },
  updateNurse: async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/nurse/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error('Error updating nurse');
    }
  },
  deleteNurse: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/nurse/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error deleting nurse');
    }
  },

  // Other API functions for different endpoints...
};

export default ApiService;
