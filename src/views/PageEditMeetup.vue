<template>
  <LayoutMeetupForm title="Редактирование митапа">
  <MeetupForm 
  v-if="meetup" 
  :meetup="meetup" 
  submit-text="Сохранить"
  @submit="handleSubmit"
  @cancel="$router.push({ name: 'meetup', params: { meetupId: meetupId } })"
  />
  <UiContainer v-else>
    <UiAlert>Загрузка...</UiAlert>
  </UiContainer>
   </LayoutMeetupForm>
</template>

<script>
import LayoutMeetupForm from '../components/LayoutMeetupForm.vue';
import MeetupForm from '../components/MeetupForm.vue';
import UiAlert from '../components/UiAlert.vue';
import UiContainer from '../components/UiContainer.vue';
import { useHeadTitle } from '../plugins/headTitle/index.js';
import { useMeetupFormSubmit } from '../composables/useMeetupFormSubmit.js';
import { useMeetupFetch } from '../composables/useMeetupFetch.js';

export default {
  name: 'PageEditMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupForm,
    LayoutMeetupForm
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
      const addTitle = useHeadTitle();
     
    addTitle('Редактирование митапа | Meetups');

    const { meetup } = useMeetupFetch(props.meetupId);

    const handleSubmit = useMeetupFormSubmit('edit');

    return {
      meetup,
      handleSubmit,
    };
  },
};
</script>

<style scoped></style>
