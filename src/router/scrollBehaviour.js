/** @implements {import('vue-router').RouterScrollBehavior} */
export function scrollBehavior(to, from, savedPosition) {

    if (to.meta.saveScrollPosition && from.meta.saveScrollPosition) {
        return null; // Не изменять положение при переходе между маршрутами с истинными meta свойствами
      }
  
      if (savedPosition) {
        return savedPosition;
      } 
      
      if(to.hash) {
        return {
          el: to.hash,
        }
      }

      return { top: 0, left: 0 }
}
