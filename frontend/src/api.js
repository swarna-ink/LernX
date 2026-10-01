// Frontend API Axios/Fetch Integration Service
const API_BASE_URL = 'http://localhost:5000/api/students';

export const fetchStudentsAPI = async (search = '', department = '') => {
  const query = new URLSearchParams({ search, department }).toString();
  const res = await fetch(`${API_BASE_URL}?${query}`);
  return res.json();
};

export const createStudentAPI = async (data) => {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateStudentAPI = async (id, data) => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteStudentAPI = async (id) => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};