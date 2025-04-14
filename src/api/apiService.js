import axios from 'axios';

const API_BASE_URL = 'https://localhost:7292/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (identifier, password) => {
  try {
    const response = await api.post('/auth/login', { identifier, password });
    return response.data; 
  } catch (error) {
    console.error('Erro ao fazer login:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data; 
  } catch (error) {
    console.error('Erro ao cadastrar:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const savePersonalData = async (data, token) => {
  try {
    const response = await api.post('/user/personal-data', data, {
      headers: { Authorization: `Bearer ${token}` }, 
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar dados pessoais:', error.response ? error.response.data : error.message);
    throw error;
  }

  
};

export const saveSchoolInfo = async (data, token) => {
  try {
    const response = await api.post('/user/school-info', data, {
      headers: { Authorization: `Bearer ${token}` }, 
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar dados pessoais:', error.response ? error.response.data : error.message);
    throw error;
  }

  
};

export const saveHealthInfo = async (data, token) => {
  try {
    const response = await api.post('/user/health-info', data, {
      headers: { Authorization: `Bearer ${token}` }, 
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar dados pessoais:', error.response ? error.response.data : error.message);
    throw error;
  }

  
};

export default api;