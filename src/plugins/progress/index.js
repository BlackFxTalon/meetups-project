import { createApp, inject } from 'vue';
import TheTopProgressBar from './TheTopProgressBar.vue';

// Используйте эту константу в качестве ключа provide/inject
export const PROGRESS_KEY = Symbol('PROGRESS_KEY');

// Функция для удобного внедрения с Composition API
export function useProgress() {
  return inject(PROGRESS_KEY);
}

export function createProgress({ container, router } = {}) {
  // Функция должна создать экземпляр TheTopProgressBar и смонтировать в элемент container
  // Если container не передан, то createProgress должна сама создать контейнер для монтирования
  const containerElement = document.createElement('div');
  document.body.appendChild(containerElement);
  const progress = createApp(TheTopProgressBar).mount(container || containerElement);


  // Если передан router, прогресс должен интегрироваться с VueRouter:
// Перед переходом на маршрут должен запускаться прогресс
// После завершения перехода на маршрут должен завершаться прогресс
// В случае ошибки при переходе должен прогресс должен завершаться неуспешно

if (router) {
  router.beforeEach((to, from, next) => {
    progress.start(to.fullPath);
    next();
  });

  router.afterEach(() => {
    progress.finish();
  });

  router.onError(() => {
    progress.fail();
  });
}
// Добавляем метод инсталляции плагина
progress.install = (app) => {
  app.provide(PROGRESS_KEY, progress);
};

// Возвращаем объект progress
return progress;

}
