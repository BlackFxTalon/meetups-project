import { httpClient } from './httpClient/httpClient.js';

/**
 * Получить список всех митапов
 * @returns {Promise<ResultContainer<Meetup[]>>}
 */
export function getMeetups() {
  return httpClient.get('/meetups');
}

/**
 * Получить митап по ID
 * @param {number} id
 * @returns {Promise<ResultContainer<Meetup>>}
 */
export function getMeetup(id) {
  return httpClient.get(`/meetups/${id}`);
}

/**
 * Создать митап
 * @param {Object} meetup
 * @returns {Promise<ResultContainer<Meetup>>}
 */
export function postMeetup(meetup) {
  return httpClient.post('/meetups', meetup)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
}

/**
 * Обновить митап
 * @param {Object} meetup
 * @returns {Promise<ResultContainer<Meetup>>}
 */
export function putMeetup(meetup) {
  return httpClient.put(`/meetups/${meetup}`)
  .then((response) => {
    response.json()
  })
  .then((data) => {
    return {
      success: true,
      data: data,
    };
  })
  .catch((error) => {
    return {
      success: false,
      error: error.message,
    };
  });
}

/**
 * Удалить митап
 * @param {number} id
 * @returns {Promise<ResultContainer<void>>}
 */
export function deleteMeetup(id) {
  // TODO: реализовать функцию
}

/**
 * Добавить текущего пользователя в участники митапа
 * @param {number} id
 * @returns {Promise<ResultContainer<void>>}
 */
export function attendMeetup(id) {
  // TODO: реализовать функцию
}

/**
 * Удалить текущего пользователя из участников
 * @param {number} id
 * @returns {Promise<ResultContainer<void>>}
 */
export function leaveMeetup(id) {
  // TODO: реализовать функцию
}
