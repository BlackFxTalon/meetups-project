<template>
  <div class="button-group" role="group">
    <slot></slot>
  </div>
</template>

<script>
import { computed } from 'vue';
export default {
  name: 'UiButtonGroup',

  props: {
    modelValue: {
      required: true,
    },
  },

  emits: ['update:modelValue'],

  provide() {
    return {
      buttonGroupModel: {
        modelValue: computed(() => this.modelValue),
        updateModelValue: this.updateModelValue,
      }
    }
  },

  methods: {
    updateModelValue(value) {
      this.$emit('update:modelValue', value);
    },
  },
};
</script>

<style scoped>
/* _button-group.css */
.button-group {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: nowrap;
}
</style>
