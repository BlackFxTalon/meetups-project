<template>
  <UiInput
  :type="type"
  :model-value="formattedValue"
  :step="step"
  @input="$emit('update:modelValue', $event.target.valueAsNumber)"
  >
  <template v-for="slotName of Object.keys($slots)" #[slotName]>
  <slot :name="slotName" />
  </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    type: {
      type: String,
      default: 'date',
      validator: (value) => ['date', 'time', 'datetime-local'].includes(value),
    },
    modelValue: {
      type: Number,
      default: null
    },
    step: String,
  },

  emits: ['update:modelValue'],

  computed: {
    formattedValue() {

      if (this.modelValue === null || this.modelValue === undefined) {
        return "";
      }

      const date = new Date(this.modelValue);

      switch (this.type) {
        case 'date':
        return date.toISOString().slice(0, 10);
        case "time":
        return this.step === '60' ? date.toISOString().slice(11, 19) : date.toISOString().slice(11, 16);
        case "datetime-local":
          return date.toISOString().slice(0, 16);
        default:
        return date.toISOString();
      }
    }
  },


};
</script>