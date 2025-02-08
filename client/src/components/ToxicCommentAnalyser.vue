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
import type { CommentResponse } from "@/api";

const exampleComments = [
  "Ein harmloses Beispiel",
  "Du bist ein Idiot",
  "Dein Kopf ist so klein",
  "Dein Mutter ist so hässlich",
];

const commentText = ref("");
const response = ref<CommentResponse | null>(null);
const loading = ref(false);

const api = useDefaultApi();
const { toast } = useToast();
const { t } = useI18n();

const onClick = async () => {
  if (!commentText.value.trim()) return;
  await analyse();
};

const fillCommentAndAnalyse = async (comment: string) => {
  commentText.value = comment;
  await analyse();
};

const analyse = async () => {
  try {
    loading.value = true;

    const { data } = await api.commentApiCommentPost({
      comment: commentText.value,
    });
    response.value = data;
  } catch (error) {
    console.error("Error while predicting response", error);
    toast({
      title: t("toxicCommentAnalyser.error.title"),
      description: t("toxicCommentAnalyser.error.description"),
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
      <i18n-t keypath="toxicCommentAnalyser.description" tag="span">
        <template #link>
          <a
            class="text-blue-600 visited:text-purple-600"
            href="https://huggingface.co/google-bert/bert-base-german-cased"
            target="_blank"
          >
            GermanBERT
          </a>
        </template>
      </i18n-t>
    </blockquote>

    <div class="flex flex-col gap-4 w-full">
      <Label>{{ t("toxicCommentAnalyser.inputLabel") }}</Label>
      <Textarea v-model="commentText"> </Textarea>
    </div>

    <div class="flex flex-col gap-2">
      <Label> {{ t("toxicCommentAnalyser.examplesLabel") }}</Label>
      <Badge
        v-for="comment in exampleComments"
        @click="fillCommentAndAnalyse(comment)"
        >{{ comment }}</Badge
      >
    </div>

    <Button @click="onClick" :disabled="loading">
      {{ t("toxicCommentAnalyser.buttonTitle") }}
    </Button>

    <div v-if="response" class="flex flex-col items-center gap-4">
      <span>
        {{ formatPercentage(response.toxic_prob) }}
        {{ t("toxicCommentAnalyser.formProbabilityLabel") }}
      </span>
      <PercentageBar :probability="response.toxic_prob" />
    </div>
  </div>
</template>
