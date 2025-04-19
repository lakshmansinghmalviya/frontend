import { quizAppBaseUrl } from './BaseEndpoint';

const version = 'v1';
const api = 'api';
const base = 'feedbacks';

export const feedbackEndpoints = {
  base: `${quizAppBaseUrl}/${api}/${version}/${base}`,
};
