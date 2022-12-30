<template>
  <span>
    {{ increment }}
  </span>
</template>
<script>
export default {
  name: "IncreaseNumber",
  props: {
    number: {
      type: Number,
      required: true
    }
  },
  data: () => {
    return {
      increment: 0,
      intervalId: null
    };
  },
  methods: {
    animateNumber(start, end, duration) {
      const difference = end - start;
      const updateInterval = duration / difference;
      this.increment = start;
      const timer = setInterval(() => {
        start++;
        this.increment = start;
        if (start >= end) {
          clearInterval(timer);
        }
      }, updateInterval);
    }
  },
  mounted() {
    this.animateNumber(0, this.number, 1000);
  }
};
</script>
