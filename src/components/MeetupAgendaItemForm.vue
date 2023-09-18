<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="$emit('remove')">
      <UiIcon icon="trash" />
    </button>

    <UiFormGroup>
      <UiDropdown 
      title="Тип" 
      :options="$options.agendaItemTypeOptions" 
      name="type" 
      v-model="localAgendaItem.type"
      />
    </UiFormGroup>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <UiFormGroup label="Начало">
          <UiInput 
          type="time" 
          placeholder="00:00" 
          name="startsAt" 
          v-model="localAgendaItem.startsAt"
          />
        </UiFormGroup>
      </div>
      <div class="agenda-item-form__col">
        <UiFormGroup label="Окончание">
          <UiInput 
          type="time" 
          placeholder="00:00" 
          name="endsAt" 
          v-model="localAgendaItem.endsAt"
          />
        </UiFormGroup>
      </div>
    </div>

    <UiFormGroup 
    :label="agendaItemField.label" 
    v-for="(agendaItemField, agendaItemFieldName) in $options.agendaItemFormSchemas[localAgendaItem.type]"
    :key="agendaItemFieldName"
    >
    <component
    :is="agendaItemField.component"
    v-bind="agendaItemField.props"
    v-model="localAgendaItem[agendaItemFieldName]"
    />
    </UiFormGroup>
  </fieldset>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiInput from './UiInput.vue';
import UiDropdown from './UiDropdown.vue';
import { agendaItemOptions, talkLanguageOptions } from '../services/meetupService.js';


/**
 * @typedef FormItemSchema
 * @property {string} label
 * @property {string|object} component
 * @property {object} props
 */
/** @typedef {string} AgendaItemField */
/** @typedef {string} AgendaItemType */
/** @typedef {Object.<AgendaItemType, FormItemSchema>} FormSchema */

/** @type FormSchema */
const commonAgendaItemFormSchema = {
  title: {
    label: 'Нестандартный текст (необязательно)',
    component: 'ui-input',
    props: {
      name: 'title',
    },
  },
};

/** @type {Object.<AgendaItemField, FormSchema>} */
const agendaItemFormSchemas = {
  registration: commonAgendaItemFormSchema,
  opening: commonAgendaItemFormSchema,
  talk: {
    title: {
      label: 'Тема',
      component: 'ui-input',
      props: {
        name: 'title',
      },
    },
    speaker: {
      label: 'Докладчик',
      component: 'ui-input',
      props: {
        name: 'speaker',
      },
    },
    description: {
      label: 'Описание',
      component: 'ui-input',
      props: {
        multiline: true,
        name: 'description',
      },
    },
    language: {
      label: 'Язык',
      component: 'ui-dropdown',
      props: {
        options: talkLanguageOptions,
        title: 'Язык',
        name: 'language',
      },
    },
  },
  break: commonAgendaItemFormSchema,
  coffee: commonAgendaItemFormSchema,
  closing: commonAgendaItemFormSchema,
  afterparty: commonAgendaItemFormSchema,
  other: {
    title: {
      label: 'Заголовок',
      component: 'ui-input',
      props: {
        name: 'title',
      },
    },
    description: {
      label: 'Описание',
      component: 'ui-input',
      props: {
        multiline: true,
        name: 'description',
      },
    },
  },
};

export default {
  name: 'MeetupAgendaItemForm',

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  agendaItemOptions,
  agendaItemFormSchemas,

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

    data() {
    return {
        localAgendaItem: { ...this.agendaItem },
    }
    },

  emits: ['update:agendaItem', 'remove'],

  watch: {
    localAgendaItem: {
      deep: true,
       handler() {
         this.$emit('update:agendaItem', this.localAgendaItem)
       }
    },

    'localAgendaItem.startsAt': {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue && oldValue) {
          const newStartTime = new Date(`1970-01-01T${newValue}:00.000Z`);
          const oldStartTime = new Date(`1970-01-01T${oldValue}:00.000Z`);
          const timeDifference = newStartTime - oldStartTime;

          const newEndTime = new Date(`1970-01-01T${this.localAgendaItem.endsAt}:00.000Z`);
          newEndTime.setTime(newEndTime.getTime() + timeDifference);

          const newEndsAt = newEndTime.toISOString().slice(11, 16);
          this.localAgendaItem.endsAt = newEndsAt;
        }
        
      },
    },

    
  },

};
</script>

<style scoped>
/* _agenda-item-form.css */

.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
