<template>
  <LayoutBase>
    <RouterView>
      <template #default="{ Component }">
        <KeepAlive v-if="Component" :max="3">
          <component :is="Component" />
        </KeepAlive>
      </template>
      <template #fallback>
        <UiAlert>Загрузка...</UiAlert>
      </template>
    </RouterView>
  </LayoutBase>
</template>

<script>
import LayoutBase from './components/LayoutBase.vue';
import UiAlert from './components/UiAlert.vue';
import { httpClient } from './api/httpClient/httpClient.js';
import { useHeadTitle } from './plugins/headTitle/index.js';
import { useToaster } from './plugins/toaster/index.js';
import { useAuthStore } from './stores/useAuthStore.js';
import { deleteUserData } from './services/authService';

export default {
  name: 'App',

  components: {
    UiAlert,
    LayoutBase,
  },

  setup() {
      const addTitle = useHeadTitle();
     
      addTitle('meetups');

      const toaster = useToaster();

      const authStore = useAuthStore();
    

    // для авторизованных пользователей - запросить новые данные пользователя для актуализации и проверки актуальности

    httpClient.onUnauthenticated(() => {
      // сессия пользователя больше не валидна - нужна обработка потери авторизации
      deleteUserData();
      location.reload();
    });

    httpClient.onNetworkError(() => {
      // проблема с сетью, стоит вывести тост пользователю
      toaster.error('Проблема с интернет соединением');
    });

    // обработка глобальных ошибок - необработанные исключения можно залогировать и вывести тост
    // глобальные ошибки можно поймать событиями "error" и "unhandledrejection"

    const globalErrorHandler = (err) => {
      console.error(err);
      toaster.error(err.message);
    };
    window.addEventListener('error', (err) => globalErrorHandler(err));
    window.addEventListener('unhandledrejection', ({ reason: err }) => globalErrorHandler(err));

    // user restore

    if (authStore.isAuthenticated) {
      authStore.restoreUser();
    }

    return {
      addTitle,
      toaster,
      authStore,
    }
  },
};
</script>

<style>
/* Основные глобальные стили - не scoped стили  */
/* app.css */
@import url('./assets/styles/_variables.css');
@import url('./assets/styles/_fonts.css');
@import url('./assets/styles/_common.css');
</style>
