import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/students';

const StudentService = {
  getAllStudents: () => axios.get(BASE_URL),
  getStudentById: (id) => axios.get(`${BASE_URL}/${id}`),
  createStudent: (student) => axios.post(BASE_URL, student),
  updateStudent: (id, student) => axios.put(`${BASE_URL}/${id}`, student),
  deleteStudent: (id) => axios.delete(`${BASE_URL}/${id}`),
};

export default StudentService;
