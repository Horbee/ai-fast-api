<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import PercentageBar from "@/components/PercentageBar.vue";
import { Button } from "@/components/ui/button";
import { useDefaultApi } from "@/composables/useDefaultApi";
import { useToast } from "@/components/ui/toast/use-toast";
import { Textarea } from "@/components/ui/textarea";

import { formatPercentage } from "@/lib/utils";
import type { TweetResponse } from "@/api";

const tweetText = ref("");
const response = ref<TweetResponse | null>(null);
const loading = ref(false);

const api = useDefaultApi();
const { toast } = useToast();
const { t } = useI18n();

const onClick = async () => {
  if (!tweetText.value.trim()) return;

  try {
    loading.value = true;

    const { data } = await api.tweetApiTweetPost({
      tweet: tweetText.value,
    });
    response.value = data;
  } catch (error) {
    console.error("Error while predicting response", error);
    toast({
      title: t("tweetAnalyser.error.title"),
      description: t("tweetAnalyser.error.description"),
      variant: "destructive",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col gap-6 items-center p-4">
    <blockquote class="max-w-[400px] border-l-2 pl-6 italic">
      {{ t("tweetAnalyser.description") }}
    </blockquote>

    <div class="flex flex-col gap-4 w-full">
      <Textarea v-model="tweetText"> </Textarea>
    </div>

    <Button @click="onClick" :disabled="loading">
      {{ t("tweetAnalyser.buttonTitle") }}
    </Button>

    <div v-if="response" class="flex flex-col items-center gap-4">
      <span>
        {{ formatPercentage(response.disaster_prob) }}
        {{ t("tweetAnalyser.formProbabilityLabel") }}
      </span>
      <PercentageBar :probability="response.disaster_prob" />

      <span v-if="response.is_disaster">Disaster</span>
      <span v-else>NOT Disaster</span>
    </div>
  </div>
</template>
