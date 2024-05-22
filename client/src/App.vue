<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import PercentageBar from "@/components/PercentageBar.vue";
import { ref } from "vue";
import { useDefaultApi } from "@/composables/useDefaultApi";
import type { ProbabilityResponse } from "@/api";
import { readFilePromise } from "@/utils/read-file-promise";
import uploadSvg from "@/assets/card.svg";

const input = ref<HTMLInputElement | null>(null);
const image = ref<File | null>(null);
const imageSrc = ref<string | null>(null);
const probabilities = ref<ProbabilityResponse[]>([]);

const api = useDefaultApi();

const onClick = async () => {
  if (!image.value) return;
  const { data } = await api.cardApiCardPost(image.value);
  probabilities.value = data.probabilities;
};

const selectFile = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const files = target?.files;
  if (files) {
    const file = files[0];
    image.value = file;
    imageSrc.value = await readFilePromise(file);
    if (input.value) {
      input.value.value = "";
    }
  }
};

const formatPercentage = (value: number) => {
  const percentage = (value * 100).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return percentage + "%";
};
</script>

<template>
  <div class="flex flex-col gap-4 items-center p-4">
    <div
      class="w-[250px] min-h-[350px] bg-slate-300 hover:bg-slate-300/80 border rounded-md border-dashed border-gray-500 cursor-pointer flex items-center justify-center"
      :class="{ 'border-0': imageSrc }"
      @click="input?.click()"
    >
      <img v-if="imageSrc" :src="imageSrc" class="w-full" />
      <img v-else :src="uploadSvg" width="75" height="75" />

      <input
        ref="input"
        type="file"
        accept="image/*"
        @change="selectFile"
        hidden
      />
    </div>
    <Button @click="onClick" :disabled="!image">Analyse</Button>

    <div v-for="p in probabilities" class="flex items-center gap-4">
      <span> {{ p.name }}: {{ formatPercentage(p.probability) }} </span>
      <PercentageBar :probability="p.probability" />
    </div>
  </div>
</template>
