<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import PercentageBar from "@/components/PercentageBar.vue";
import { Button } from "@/components/ui/button";
import { useDefaultApi } from "@/composables/useDefaultApi";
import { useToast } from "@/components/ui/toast/use-toast";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

import { formatPercentage } from "@/lib/utils";
import type { TweetResponse } from "@/api";

const exampleTweets = [
  "So excited about the new movie coming out next week!",
  "Just experienced a massive earthquake!",
  "This movie was like an earthquake for me!",
];

const tweetText = ref("");
const response = ref<TweetResponse | null>(null);
const loading = ref(false);

const api = useDefaultApi();
const { toast } = useToast();
const { t } = useI18n();

const onClick = async () => {
  if (!tweetText.value.trim()) return;
  await analyse();
};

const fillTweetAndAnalyse = async (tweet: string) => {
  tweetText.value = tweet;
  await analyse();
};

const analyse = async () => {
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
      <i18n-t keypath="tweetAnalyser.description" tag="span">
        <template #link>
          <a
            class="text-blue-600 visited:text-purple-600"
            href="https://huggingface.co/google-bert/bert-base-uncased"
            target="_blank"
          >
            BERT
          </a>
        </template>
      </i18n-t>
    </blockquote>

    <div class="flex flex-col gap-4 w-full">
      <Label>{{ t("tweetAnalyser.inputLabel") }}</Label>
      <Textarea v-model="tweetText"> </Textarea>
    </div>

    <div class="flex flex-col gap-2">
      <Label> {{ t("tweetAnalyser.examplesLabel") }}</Label>
      <Badge
        v-for="tweet in exampleTweets"
        @click="fillTweetAndAnalyse(tweet)"
        >{{ tweet }}</Badge
      >
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
    </div>
  </div>
</template>
