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
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@iconify/vue";
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
const selectedFeedback = ref<"correct" | "incorrect" | null>(null);
const modelVersion = ref<"v1" | "v2" | "v3">("v3");

const api = useDefaultApi();
const { toast } = useToast();
const { t } = useI18n();

const onFeedbackClick = async (feedback: "correct" | "incorrect") => {
  if (!response.value?.id) return;

  selectedFeedback.value = feedback;

  try {
    await api.updateCommentApiCommentIdPut(response.value.id, {
      is_correct: feedback === "correct",
    });
    toast({ title: t("toxicCommentAnalyser.feedback.saved") });
  } catch (error) {
    console.error("Error while updating feedback", error);
    toast({
      title: t("toxicCommentAnalyser.feedback.error.title"),
      description: t("toxicCommentAnalyser.feedback.error.description"),
      variant: "destructive",
    });
  }
};

const onAnalyseClick = async () => {
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

    const { data } = await api.commentApiCommentVersionPost(
      modelVersion.value,
      {
        comment: commentText.value,
      }
    );
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

    <Select v-model="modelVersion">
      <Label> {{ t("toxicCommentAnalyser.modelVersionInputLabel") }} </Label>
      <SelectTrigger>
        <SelectValue placeholder="Model version" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="v1"> V1 </SelectItem>
        <SelectItem value="v2"> V2 </SelectItem>
        <SelectItem value="v3"> V3 </SelectItem>
      </SelectContent>
    </Select>

    <div class="flex flex-col gap-4 w-full">
      <Label>{{ t("toxicCommentAnalyser.inputLabel") }}</Label>
      <Textarea v-model="commentText" @keydown.enter="onAnalyseClick" />
    </div>

    <Button @click="onAnalyseClick" :disabled="loading">
      {{ t("toxicCommentAnalyser.buttonTitle") }}
    </Button>

    <div v-if="response" class="flex flex-col items-center gap-4">
      <span>
        {{ formatPercentage(response.toxic_prob) }}
        {{ t("toxicCommentAnalyser.formProbabilityLabel") }}
      </span>
      <PercentageBar :probability="response.toxic_prob" />

      <div class="flex flex-row gap-2">
        <Button
          :variant="selectedFeedback === 'correct' ? 'default' : 'outline'"
          size="lg"
          @click="onFeedbackClick('correct')"
        >
          <Icon icon="mdi:thumbs-up" class="w-4 h-4 mr-2" />
          {{ t("toxicCommentAnalyser.feedback.correct") }}
        </Button>

        <Button
          :variant="selectedFeedback === 'incorrect' ? 'default' : 'outline'"
          size="lg"
          @click="onFeedbackClick('incorrect')"
        >
          <Icon icon="mdi:thumbs-down" class="w-4 h-4 mr-2" />
          {{ t("toxicCommentAnalyser.feedback.incorrect") }}
        </Button>
      </div>
    </div>

    <Accordion type="single" collapsible class="w-full">
      <AccordionItem value="1">
        <AccordionTrigger>
          {{ t("toxicCommentAnalyser.examplesLabel") }}
        </AccordionTrigger>
        <AccordionContent>
          <div class="flex flex-col gap-2">
            <Badge
              v-for="comment in exampleComments"
              @click="fillCommentAndAnalyse(comment)"
            >
              {{ comment }}
            </Badge>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>
