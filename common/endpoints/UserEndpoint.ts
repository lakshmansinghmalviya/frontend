import { quizAppBaseUrl } from './BaseEndpoint';

const version = 'v1';
const api = 'api';
const base = 'users';
const filters = 'filters';
const educatorProfileData = 'educatorProfileData';
const adminProfileData = 'adminProfileData';
const currentUser = 'currentUser';
const logout = 'logout';

export const usersEndpoints = {
  base: `${quizAppBaseUrl}/${api}/${version}/${base}`,
  getById: (id: number) => `${quizAppBaseUrl}/${api}/${version}/${base}/${id}`,
  filters: (query: string) => `${quizAppBaseUrl}/${api}/${version}/${base}/${filters}?${query}`,
  educatorProfileData: `${quizAppBaseUrl}/${api}/${version}/${base}/${educatorProfileData}`,
  adminProfileData: `${quizAppBaseUrl}/${api}/${version}/${base}/${adminProfileData}`,
  currentUser: `${quizAppBaseUrl}/${api}/${version}/${base}/${currentUser}`,
  logout: `${quizAppBaseUrl}/${api}/${version}/${base}/${logout}`,
};
