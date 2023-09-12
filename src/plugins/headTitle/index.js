import { inject } from 'vue';
export const HEADTITLE_KEY = Symbol('HEADTITLE_KEY');

export function createHeadTitle() {
  const addTitle = (newTitle) => document.title = newTitle;

  addTitle.install = (app) => {
    app.provide(HEADTITLE_KEY, addTitle)
  }

  return addTitle;
}

export function useHeadTitle() {
  return inject(HEADTITLE_KEY);
}