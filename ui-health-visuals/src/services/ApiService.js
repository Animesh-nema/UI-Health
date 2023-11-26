import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

const ApiService = {
  registerNurse: async (payload) => {
    try {
      const response = await axios.post(`${API_URL}/nurse`, payload);
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  getVaccines: async () => {
    try {
      const response = await axios.get(`${API_URL}/vaccines`);
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  addVaccine: async (payload) => {
    try {
      const response = await axios.post(`${API_URL}/vaccine/add`, payload);
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  getPatients: async () => {
    try {
      const response = await axios.get(`${API_URL}/patients`);
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  getPatientInfo: async (patientId) => {
    try {
      const response = await axios.get(`${API_URL}/patient-info/${patientId}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  },
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
};

export default ApiService;
