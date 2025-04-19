import { quizAppBaseUrl } from './BaseEndpoint';

const version = 'v1';
const api = 'api';
const base = 'bookmarks';
const filters = 'filters';
export const bookmarkEndpoints = {
  base: `${quizAppBaseUrl}/${api}/${version}/${base}`,
  deleteById: (id: number) => `${quizAppBaseUrl}/${api}/${version}/${base}/${id}`,
  filters: (query: string) => `${quizAppBaseUrl}/${api}/${version}/${base}/${filters}?${query}`,
};
