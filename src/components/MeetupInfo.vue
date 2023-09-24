<template>
  <ul class="meetup-info">
      <li>
        <UiIcon class="meetup-info__icon" :src="user"/>
        {{ organizer }}
      </li>
      <li>
        <UiIcon class="meetup-info__icon" :src="map"/>
        {{ place }}
      </li>
      <li>
        <UiIcon class="meetup-info__icon" :src="`cal-lg`"/>
        <time :datetime="isoDate">{{ localDate }}</time>
      </li>
    </ul>
</template>

<script>
import UiIcon from './UiIcon.vue';
import { formatAsLocalDate, formatAsIsoDate } from '../utils/dateUtils.js';

export default {
  name: 'MeetupInfo',

  components: { UiIcon },

  props: {
    organizer: String,
    place: String,
    date: Number,
  },

  computed: {
    isoDate() {
      return formatAsIsoDate(this.date);
    },

    localDate() {
      return formatAsLocalDate(this.date);
    },


  }
};
</script>

<style scoped>
/* _meetup-info.css */

.meetup-info {
  margin: 0;
  padding: 0;
}

.meetup-info li {
  list-style-type: none;
  position: relative;
  padding-left: 36px;
  font-size: 18px;
  line-height: 28px;
  margin: 0 0 8px;
}

.meetup-info li:last-child {
  margin: 0;
}

.meetup-info__icon {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
