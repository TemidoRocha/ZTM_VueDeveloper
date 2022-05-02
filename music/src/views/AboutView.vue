<template>
  <div>About</div>
</template>

<script>
import dummyModule from '@/store/modules/dummy';

export default {
  created() {
    this.$store.registerModule('dummy', dummyModule);
  }
};
</script>

<style>
</style>
