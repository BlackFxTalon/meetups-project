<template>
  <UiToastList>
    <UiToast 
    v-for="(toastItem,index) in toastItems" 
    :key="index" 
    :message="toastItem.message"
    :delay="toastItem.delay" 
    :type="toastItem.type"
    @removeToast="handleRemoveToast(index)"
    />
  </UiToastList>
</template>

<script>
import UiToastList from '@/components/UiToastList.vue';
import UiToast from '@/components/UiToast.vue';

export default {
  name: 'TheToaster',

  components: { UiToastList, UiToast },

  data() {
    return {
       toastItems: []
    }
  },

  methods: {
    addToastItem(message, type, delay = 5000) {
      const toast = { message, type, delay };
      this.toastItems.push(toast);
      if (delay > 0) {
        setTimeout(() => {
          this.removeToast();
        }, delay);
      }
    },
     success(message, delay = 5000) {
        this.addToastItem(message, 'success', delay);
     },
     error(message, delay = 5000) {
      this.addToastItem(message, 'error', delay);
     },

     info(message, delay = 5000) {
      this.addToastItem(message, 'info', delay);
     },

     warning(message, delay = 5000) {
      this.addToastItem(message, 'warning', delay);
     },

     removeToast() {
      this.toastItems.shift();
    },
    handleRemoveToast(index) {
      this.toastItems.splice(index,1);
    }
  },


};
</script>
