import axios from 'axios';

const API_BASE_URL = 'https://sshf-api-330507742215.us-central1.run.app';

const api = axios.create({
  baseURL: API_BASE_URL
});

export const searchVeterans = async (params, token) => {
  const response = await api.get('/search', {
    params,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getVeteran = async (id, token) => {
  const response = await api.get(`/veterans/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const updateVeteran = async (id, data, token) => {
  const response = await api.put(`/veterans/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}; 