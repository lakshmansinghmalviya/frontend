import { quizAppBaseUrl } from './BaseEndpoint';

const version = 'v1';
const api = 'api';
const base = 'results';
const filters = 'filters';
const userProfileData = 'userProfileData';

export const resultEndpoints = {
  base: `${quizAppBaseUrl}/${api}/${version}/${base}`,
  getById: (id: number) => `${quizAppBaseUrl}/${api}/${version}/${base}/${id}`,
  filters: (query: string) => `${quizAppBaseUrl}/${api}/${version}/${base}/${filters}?${query}`,
  userProfileData: `${quizAppBaseUrl}/${api}/${version}/${base}/${userProfileData}`,
};
