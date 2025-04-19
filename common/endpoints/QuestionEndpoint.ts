 import { quizAppBaseUrl } from './BaseEndpoint';
 
const version = 'v1';
const api = 'api';
const base = 'questions';
const filters = 'filters';

export const questionEndpoints = {
  base: `${quizAppBaseUrl}/${api}/${version}/${base}`,
  getById: (id: number) => `${quizAppBaseUrl}/${api}/${version}/${base}/${id}`,
  updateById: (id: number) => `${quizAppBaseUrl}/${api}/${version}/${base}/${id}`,
  deleteById: (id: number) => `${quizAppBaseUrl}/${api}/${version}/${base}/${id}`,
  filters: (query: string) => `${quizAppBaseUrl}/${api}/${version}/${base}/${filters}?${query}`,
};
