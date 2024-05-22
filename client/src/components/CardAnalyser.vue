<script setup lang="ts">
import { ref } from "vue";

import Dropzone from "@/components/Dropzone.vue";
import PercentageBar from "@/components/PercentageBar.vue";
import { Button } from "@/components/ui/button";
import { useDefaultApi } from "@/composables/useDefaultApi";
import { useToast } from "@/components/ui/toast/use-toast";
import cardSvg from "@/assets/card.svg";

import type { ProbabilityResponse } from "@/api";

const image = ref<File | null>(null);
const probabilities = ref<ProbabilityResponse[]>([]);
const loading = ref(false);

const api = useDefaultApi();
const { toast } = useToast();

const onClick = async () => {
  if (!image.value) return;
  try {
    loading.value = true;

    const { data } = await api.cardApiCardPost(image.value);
    probabilities.value = data.probabilities;
  } catch (error) {
    console.error("Error while analysing card", error);
    toast({
      title: "Uh oh! Something went wrong.",
      description: "Error while analysing card",
      variant: "destructive",
    });
  } finally {
    loading.value = false;
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
    <Dropzone
      @select="(file) => (image = file)"
      :placeholder-icon="cardSvg"
      class="min-h-[350px]"
    />
    <Button @click="onClick" :disabled="!image || loading">Analyse</Button>

    <div v-for="p in probabilities" class="flex items-center gap-4">
      <span> {{ p.name }}: {{ formatPercentage(p.probability) }} </span>
      <PercentageBar :probability="p.probability" />
    </div>
  </div>
</template>
