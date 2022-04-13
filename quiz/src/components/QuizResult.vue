<template>
  <div class="result">
    <div class="title">
      You got sample result {{ results[resultIndex].title }}!
    </div>
    <div class="desc">{{ results[resultIndex].desc }}</div>
  </div>
</template>

<script>
export default {
  name: "QuizResult",
  props: ["results", "totalCorrect"],
  computed: {
    resultIndex() {
      let index = 0;

      this.results.forEach((item, i) => {
        if (item.min <= this.totalCorrect && item.max >= this.totalCorrect) {
          index = i;
        }
      });
      return index;
    },
  },
};
</script>

<style>
</style>