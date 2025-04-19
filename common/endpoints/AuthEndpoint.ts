import { quizAppBaseUrl } from './BaseEndpoint';

const version = 'v1';
const api = 'api';
const base = 'auth';

export const authEndpoints = {
  login: `${quizAppBaseUrl}/${api}/${version}/${base}/login`,
  register: `${quizAppBaseUrl}/${api}/${version}/${base}/register`,
  refreshToken: `${quizAppBaseUrl}/${api}/${version}/${base}/refresh-token`,
  logout: `${quizAppBaseUrl}/${api}/${version}/${base}/logout`,
};
