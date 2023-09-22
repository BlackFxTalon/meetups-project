<template>
  <UiCalendarView v-slot="{ timestamp }">
    <UiCalendarEvent 
    v-for="meetup in getMeetupsForDay[timestamp]"
    tag="RouterLink"
    :key="meetup.id" 
    :to="{ name: 'meetup', params: { meetupId: meetup.id } }"
    >
      {{ meetup.title }}
    </UiCalendarEvent>
  </UiCalendarView>
</template>

<script>
import UiCalendarView from './UiCalendarView.vue';
import UiCalendarEvent from './UiCalendarEvent.vue';

export default {
  name: 'MeetupsCalendar',

  components: {
    UiCalendarEvent,
    UiCalendarView,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  computed: {
   // Вычисляемое свойство для получения митапов для конкретного дня
  getMeetupsForDay() {
    const meetupsByDate = {};

    for (const meetup of this.meetups) {
        if (!meetupsByDate[meetup.date]) {
          meetupsByDate[meetup.date] = [];
        }
        meetupsByDate[meetup.date].push(meetup);
      }

      return meetupsByDate;
    },
  }
};
</script>

<style scoped></style>
