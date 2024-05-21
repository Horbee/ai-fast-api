<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ probability: number }>();

const width = computed(() => {
  return `${250 * props.probability}px`;
});
</script>

<template>
  <div class="relative">
    <div class="h-[15px] w-[250px] bg-slate-400"></div>
    <div
      class="h-[15px] bg-blue-500 absolute top-0 left-0 animate-fill"
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
  animation: fill 1s ease-in-out forwards;
}
</style>
