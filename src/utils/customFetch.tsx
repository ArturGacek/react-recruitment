import axios from 'axios';

const ninjaApiKey = import.meta.env.VITE_NINJA_API_KEY;

const customFetch = axios.create({
  baseURL: 'https://api.api-ninjas.com',
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': ninjaApiKey,
  },
});

export default customFetch;
