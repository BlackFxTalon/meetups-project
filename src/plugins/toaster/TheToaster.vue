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
import UiToastList from './UiToastList.vue';
import UiToast from './UiToast.vue';

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


<style scoped>
/* _toaster.css */
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
