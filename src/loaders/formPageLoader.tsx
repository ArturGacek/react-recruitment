import customFetch from '../utils/customFetch';

export const calendarStatsLoader = async () => {
  try {
    const response = await customFetch.get('/v1/holidays?country=PL&year=2024');
    return response.data;
  } catch (error) {
    return null;
  }
};
