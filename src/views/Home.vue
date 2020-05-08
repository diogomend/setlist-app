<template>
  <div class="fill-width">
    <setlist-stats />
    <top-bands />
  </div>
</template>

<script>
// @ is an alias to /src
import TopBands from "@/components/TopBands";
import SetlistStats from "@/components/SetlistStats";
export default {
  name: "Home",
  components: {
    TopBands,
    SetlistStats
  }
};
</script>

<style scoped>
.fill-width {
  width: 100%;
}
/deep/ h1 {
  text-align: left;
  color: #ff7043;
}
</style>
