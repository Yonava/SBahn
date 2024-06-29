import axios from 'axios';
import { localKeys } from './locals';

const USERS_URL = 'http://localhost:3000/api/users';

export const getUserByName = async (name) => {
  console.log('username', name)
  const response = await axios.get(`${USERS_URL}/${name}`);
  return response.data;
}

export const createUser = async (user) => {
  console.log('user', user)
  const response = await axios.post(`${USERS_URL}`, user);
  return response.data;
}

export const postTrip = async (trip) => {
  const username = localStorage.getItem(localKeys.username);
  if (!username) return 'User not logged in. Cannot save trip.';
  const response = await axios.post(`${USERS_URL}/${username}`, trip);
  return response.data;
}