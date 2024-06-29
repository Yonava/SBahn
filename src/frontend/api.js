import axios from 'axios';
import { localKeys } from './locals';

const URL = 'http://localhost:3000';

export const getUserByName = async (name) => {
  console.log('username', name)
  const response = await axios.get(`${URL}/users/${name}`);
  return response.data;
}

export const createUser = async (user) => {
  console.log('user', user)
  const response = await axios.post(`${URL}/users`, user);
  return response.data;
}

export const postTrip = async (trip) => {
  const username = localStorage.getItem(localKeys.username);
  if (!username) return console.warn('User not logged in.');
  const response = await axios.post(`${URL}/${username}`, trip);
  return response.data;
}