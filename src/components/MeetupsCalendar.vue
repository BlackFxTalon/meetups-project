<template>
  <UiCalendarView v-slot="{ day }">
    <UiCalendarEvent 
    v-for="meetup in getMeetupsForDay[day.date]"
    tag="a"
    :key="meetup.id" 
    :href="`/meetups/${meetup.id}`"
    >
      {{ meetup.title }}
    </UiCalendarEvent>
  </UiCalendarView>
</template>

<script>
import UiCalendarView from './UiCalendarView.vue';
import UiCalendarEvent from './UiCalendarEvent.vue';
import dayjs from "dayjs";

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
        const formattedDate = dayjs(meetup.date).format("YYYY-MM-DD");
        if (!meetupsByDate[formattedDate]) {
          meetupsByDate[formattedDate] = [];
        }
        meetupsByDate[formattedDate].push(meetup);
      }

      return meetupsByDate;
    },
  }
};
</script>

<style scoped></style>
