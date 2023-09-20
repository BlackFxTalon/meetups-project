import { logoutUser } from '../api/authApi';

export const AUTH_STORAGE_KEY = 'user';

/**
 * Saves user data to local storage.
 *
 * @param {Object} userData - The user data to be saved.
 * @return {undefined} - This function does not return a value.
 */
export function saveUserData(userData) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
}

/**
 * Restores the user data from local storage.
 *
 * @return {Object | null} The user data, or null if it doesn't exist.
 */
export function restoreUserData() {
    const userData = localStorage.getItem(AUTH_STORAGE_KEY);
    return userData ? JSON.parse(userData) : null;
}

/**
 * Deletes user data from local storage.
 *
 * @param {string} AUTH_STORAGE_KEY - The key used to store the user's authentication data.
 * @return {void} This function does not return a value.
 */
export function deleteUserData() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function logout() {
    return logoutUser()
    .then(result => {
        if (result.success) {
            deleteUserData();
            location.reload();
        }
        return result;
    })
}