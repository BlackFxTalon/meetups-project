/**
 * main.js - главная точка входа (entrypoint)
 * Именно в этом файле запускается и инициализируется всё приложение
 */

import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router/index.js';
import { createPinia } from 'pinia';
import { createToaster } from './plugins/toaster';
import { createProgress } from './plugins/progress';
import { createHeadTitle } from './plugins/headTitle';

const pinia = createPinia();
const toaster = createToaster({ container: '#toaster' });
const progress = createProgress({ container: '#progress', router });
const headTitle = createHeadTitle();

createApp(App)
.use(router)
.use(pinia)
.use(headTitle)
.use(toaster)
.use(progress)
.mount('#app');


// В этом же файле при необходимости можно сделать всё, что требуется делать ещё до создания приложения,
// или что не относится к Vue приложению и UI
