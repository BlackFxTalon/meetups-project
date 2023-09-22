import { ref } from 'vue';
import { useToaster } from '../plugins/toaster/index.js';
import { useProgress } from '../plugins/progress/index.js';

/**
 * @template T
 * @typedef {function(...[*]): Promise<ResultContainer<T>>} IApiFunction
 */

/**
 * @template T
 * @template {IApiFunction<T>} K
 * @typedef IUseApiReturn
 * @param {Ref<ResultContainer<T>>} result - Реактивный результат
 * @param {Ref<boolean>} isLoading - Реактивный флаг загрузки
 * @param {K} request - Функция запуска запроса
 */

/**
 * Компосабл для выполнения запросов в компонентах
 * Добавляет опциональную интеграцию с прогресс баром и тостером для отображения результата
 * Возвращает реактивные переменные с результатом
 *
 * @template T
 *
 * @param {IApiFunction<T>} apiFunc - функция, выполняющая запрос к API, и возвращающая промис с
 * @param {object} options
 * @param {boolean=false} [options.showProgress] - показывать ли прогресс загрузки через Progress плагин
 * @param {boolean|string=false} [options.successToast] - В случае успешного запроса показывать ли текст из ответа (true) или конкретную строку (string)
 * @param {boolean|string=false} [options.errorToast] - В случае неуспешного запроса показывать ли текст из ответа (true) или конкретную строку (string)
 * @return {IUseApiReturn<T, typeof apiFunc>}
 */
export function useApi(apiFunc, { showProgress = false, successToast = false, errorToast = false } = {}) {

  const toaster = useToaster();
  const progress = useProgress();


   /**
   * @typedef {Function} DecoratedCallBack
   */

  /**
   * Запустить асинхронную функцию с отображением прогресса
   * @param {T} func
   * @returns {T}
   * @template {Function} T
   */

  function withProgress(func) {
    return async (...args) => {
      progress.start(func);
      try {
        const result = await func(...args);
        progress.finish(func);
        return result;
      } catch (error) {
        progress.fail();
        throw error;
      }
    };
  }

   /**
   * Показать тост по результату в ResultContainer
   * @param {ResultContainer} result
   * @returns {ResultContainer}
   */

   function toastResult(result) {
    if (result.success && successToast) {
      toaster.success(successToast === true ? result.data.message || result.data : successToast);
    } else if (!result.success && errorToast) {
      toaster.error(errorToast === true ? result.error.message : errorToast);
    }
  }



  const result = ref(null);
  const isLoading = ref(false);

  const request = async (...args) => {

    isLoading.value = true;
    const requester = showProgress ? withProgress(apiFunc) : apiFunc;
    result.value = await requester(...args);
    isLoading.value = false;
    toastResult(result.value);
    return result.value;

  };

  return {
    request,
    result,
    isLoading,
    withProgress,
    toastResult,
  };
}
