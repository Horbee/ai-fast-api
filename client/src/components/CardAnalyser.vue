<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

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
const { t } = useI18n();

const onClick = async () => {
  if (!image.value) return;
  try {
    loading.value = true;

    const { data } = await api.cardApiCardPost(image.value);
    probabilities.value = data.probabilities;
  } catch (error) {
    console.error("Error while analysing card", error);
    toast({
      title: t("cardAnalyser.error.title"),
      description: t("cardAnalyser.error.description"),
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

const translatedCardName = (name: string) =>
  t(`cardAnalyser.cardNames.${name}`);
</script>

<template>
  <div class="flex flex-col gap-4 items-center p-4">
    <blockquote class="max-w-[400px] border-l-2 pl-6 italic">
      {{ t("cardAnalyser.description") }}
    </blockquote>
    <Dropzone
      @select="(file) => (image = file)"
      :placeholder-icon="cardSvg"
      class="min-h-[350px]"
    />
    <Button @click="onClick" :disabled="!image || loading">
      {{ t("cardAnalyser.buttonTitle") }}
    </Button>

    <div
      v-for="{ name, probability } in probabilities"
      class="flex items-center gap-4"
    >
      <span>
        {{ translatedCardName(name) }}: {{ formatPercentage(probability) }}
      </span>
      <PercentageBar :probability="probability" />
    </div>
  </div>
</template>
