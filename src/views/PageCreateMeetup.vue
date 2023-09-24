<template>
  <LayoutMeetupForm title="Создание митапа">
  <MeetupForm 
  :meetup="meetup" 
  submit-text="Создать" 
  @submit="handleSubmit"
  @cancel="$router.push({ name: 'index' })" 
  />
 </LayoutMeetupForm>
</template>

<script>
import { ref } from 'vue';
import MeetupForm from '../components/MeetupForm.vue';
import LayoutMeetupForm from '../components/LayoutMeetupForm.vue';
import { createMeetup } from '../services/meetupService.js';
import { useMeetupFormSubmit } from '../composables/useMeetupFormSubmit.js';
import { useHeadTitle } from '../plugins/headTitle/index.js';

export default {
  name: 'PageCreateMeetup',

  components: {
    MeetupForm,
    LayoutMeetupForm
  },

  setup() {
    const addTitle = useHeadTitle();
     
    addTitle('Создание митапа | Meetups');


    const meetup = ref(createMeetup());

    const handleSubmit = useMeetupFormSubmit('create');

    return {
      meetup,
      handleSubmit,
    };
  },
};
</script>

<style scoped></style>
