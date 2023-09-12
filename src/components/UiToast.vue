<template>
    <div class="toast" :class="toastTypeClass">
      <UiIcon class="toast__icon" :icon="toastTypeIcon" />
      <span>{{ message }}</span>
      <button type="button" class="toast__delete-btn" @click="removeToast">
        <UiIcon class="toast__icon toast__icon--trash" icon="trash" />
      </button>
    </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
name: 'UiToast',

components: { UiIcon },

props: {
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        validator: (value) => ['success', 'error', 'info', 'warning'].includes(value)
    },
    delay: {
      type: Number,
      required: true,
      default: 5000, 
    },
},

computed: {
    toastTypeClass() {
        return this.type === 'success' ? 'toast_success' : 
        this.type === 'error' ? 'toast_error' : this.type === 'info' ? 'toast_info' :
        this.type === 'warning' ? 'toast_warning' : ''
    },
    toastTypeIcon() {
        return this.type === 'success' ? `check-circle` : 
        this.type === 'error' ? `alert-circle` : this.type === 'info' ? `user` :
        this.type === 'warning' ? `clock` : ''
    },
},

emits:['removeToast'],

methods: {
    removeToast() {
      this.$emit('removeToast');
    },
},

}
</script>

<style scoped>
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

.toast__delete-btn {
    background-color: transparent;
    border-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.toast__icon--trash {
    margin-right: 0;
    margin-left: 12px;
    filter: hue-rotate(130deg);
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

.toast.toast_info {
  color: var(--blue);
}

.toast.toast_warning {
  color: orange;
}

.toast.toast_warning .toast__icon:not(.toast__icon--trash) {
  filter: hue-rotate(190deg);
}

</style>