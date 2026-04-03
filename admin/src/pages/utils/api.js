import axios from "axios";
const API_BASE_URL = "http://localhost:5000";

export const fetchDataFromApi = async (url) => {
  try {
    const response = await axios.get(API_BASE_URL + url);
    return response.data;
  } catch (error) {
    console.error("API GET Error:", error.response?.data || error.message);
    return null;
  }
};

export const postData = async (url, data, isFormData = false) => {
  return axios.post(API_BASE_URL + url, data, {
    headers: isFormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" },
  });
};

export const editData = async (url, updatedData) => {
  try {
    const response = await axios.put(API_BASE_URL + url, updatedData);
    return response.data;
  } catch (error) {
    console.error("API PUT Error:", error.response?.data || error.message);
    return null;
  }
};

export const deleteData = async (url) => {
  try { 
    const response = await axios.delete(API_BASE_URL + url);
    return response.data;
  } catch (error) {
    console.error("API DELETE Error:", error.response?.data || error.message);
    return null;
  }
};

