import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { getUser } from '../api/authApi';
import { saveUserData, restoreUserData } from '../services/authService';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(restoreUserData());
  const isAuthenticated = computed(() => !!user.value);

  const setUser = (value) => {
    user.value = value;
    saveUserData(user.value);
  };

  const restoreUser = async () => {
     const result = await getUser();
     if (result.success) {
        setUser(result.data);
     }
  }

  return {
    user,
    isAuthenticated,
    setUser,
    restoreUser
  };
});
