<template>
  <component class="link" :is="tag">
    <slot>Link!</slot>
  </component>
</template>

<script>
export default {
  name: 'UiLink',

  props: {
    tag: {
      type:[String, Object, Function],
      default: 'router-link',
    }
  }
};
</script>

<style scoped>
/* _link.css */
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
