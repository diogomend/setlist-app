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
    incrementNumber() {
      if (this.increment < this.number) {
        this.increment += 1;
        return;
      }

      clearInterval(this.intervalId);
    }
  },
  mounted() {
    this.intervalId = setInterval(this.incrementNumber, 20);
  }
};
</script>
