<template>
  <MeetupForm 
  :meetup="meetup" 
  submit-text="Создать" 
  @submit="handleMeetupFormSubmit('create')"
  @cancel="$router.push({ name: 'index' })" 
  />
</template>

<script>
import { ref } from 'vue';
import MeetupForm from '../components/MeetupForm.vue';
import { createMeetup } from '../services/meetupService.js';
import { useHeadTitle } from './plugins/headTitle/index.js';
import { useRouter } from 'vue-router';
import { useApi } from './useApi.js';
import { postMeetup, putMeetup } from '../api/meetupsApi.js';
import { postImage } from '../api/imageApi.js';

export default {
  name: 'PageCreateMeetup',

  components: {
    MeetupForm,
  },

  setup() {
    const addTitle = useHeadTitle();
     
    addTitle('Создание митапа | Meetups');

    const meetup = ref(createMeetup());

    function handleMeetupFormSubmit(action) {

    const router = useRouter();

  const { request: meetupRequest } = useApi(action === 'create' ? postMeetup : putMeetup, {
    showProgress: true,
    successToast: 'Сохранено',
    errorToast: true,
  });

  const { request: imageRequest } = useApi(postImage, {
    showProgress: true,
    errorToast: true,
  });

  return async (newMeetup) => {
    if (newMeetup.imageToUpload) {
      const result = await imageRequest(newMeetup.imageToUpload);
      if (!result.success) {
        return;
      }
      newMeetup.imageId = result.data.id;
      delete newMeetup.imageToUpload;
    }
    const result = await meetupRequest(newMeetup);
    if (result.success) {
      router.push({ name: 'meetup', params: { meetupId: result.data.id } });
    }
  };
}

    return {
      meetup,
      handleMeetupFormSubmit,
    };
  },
};
</script>

<style scoped></style>
