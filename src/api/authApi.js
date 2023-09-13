import { createErrorResult, createSuccessResult } from './httpClient/ResultContainer.js';
import { httpClient } from './httpClient/httpClient.js';

/**
 * Получить текущего пользователя
 * @returns {Promise<ResultContainer<User>>}
 */
export function getUser() {
  return httpClient.get('/auth/user');
}

/**
 * Авторизоваться по email и паролю
 * @param {string} email
 * @param {string} password
 * @returns {Promise<ResultContainer<User>>}
 */
export function loginUser(email, password) {
  return httpClient.post('/auth/login', { email, password });
}

/**
 * Зарегистрировать пользователя
 * @param {Object} user
 * @returns {Promise<ResultContainer<User>>}
 */
export function registerUser(user) {
  return httpClient.post('/auth/register', user)
  .then(response => createSuccessResult(user, response))
  .catch(error => createErrorResult(error, user));
}

/**
 * Разлогинить пользователя сессии
 * @returns {Promise<ResultContainer<void>>}
 */
export function logoutUser() {
   return httpClient.post('/auth/logout')
   .then(response => createSuccessResult(null, response))
   .catch(error => createErrorResult(error, null))
}
