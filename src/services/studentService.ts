import axios from "axios";
import type { Student } from "../types/Student";

const API_URL = "http://localhost:3000/students";

export const getStudents = async (): Promise<Student[]> => {
  const res = await fetch(API_URL);
  return res.json();
};

export const getStudentById = async (id: number): Promise<Student> => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

export const addStudent = async (student: Student) => {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
};

export const updateStudent = async (id: number, student: Student) => {
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
};

export const deleteStudent = async (id: number) => {
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};