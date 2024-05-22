<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ probability: number }>();

const width = computed(() => {
  return `${250 * props.probability}px`;
});
</script>

<template>
  <div class="relative overflow-hidden">
    <div class="h-4 w-[250px] bg-slate-400 rounded-full"></div>
    <div
      class="h-4 bg-blue-700 absolute top-0 left-0 animate-fill rounded-full"
      :style="{ width }"
    ></div>
  </div>
</template>

<style scoped>
@keyframes fill {
  from {
    width: 0;
  }
  to {
    width: v-bind(width);
  }
}

.animate-fill {
  animation: fill 0.25s ease-out forwards;
}
</style>
