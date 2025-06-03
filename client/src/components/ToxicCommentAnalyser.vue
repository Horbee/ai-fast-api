<script setup lang="ts">
import { ref, computed } from "vue";
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

const inputText = ref("");
const sentCommentText = ref("");
const response = ref<CommentResponse | null>(null);
const loading = ref(false);
const selectedFeedback = ref<"correct" | "incorrect" | null>(null);

const api = useDefaultApi();
const { toast } = useToast();
const { t } = useI18n();

const bertPredictions = computed(() => {
  return response.value?.predictions.bert_cased_v4_probabilities || [];
});

const electraPredictions = computed(() => {
  return (
    response.value?.predictions.electra_uncased_downsampled_probabilities || []
  );
});

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
  if (!inputText.value.trim()) return;
  sentCommentText.value = inputText.value.trim();
  await analyse();
};

const analyse = async () => {
  try {
    loading.value = true;

    const { data } = await api.commentApiCommentPost({
      comment: sentCommentText.value,
    });
    response.value = data;
    selectedFeedback.value = null;
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
  <div class="container mx-auto">
    <!-- FORM -->
    <div class="flex flex-col gap-4 w-full my-4">
      <Label>{{ t("toxicCommentAnalyser.inputLabel") }}</Label>
      <Textarea v-model="inputText" @keydown.enter="onAnalyseClick" />

      <Button @click="onAnalyseClick" :disabled="loading" class="self-end">
        {{ t("toxicCommentAnalyser.buttonTitle") }}
      </Button>
    </div>

    <!-- TEXT -->
    <p
      v-if="sentCommentText"
      class="text-base text-muted-foreground text-center"
    >
      {{ sentCommentText }}
    </p>

    <div v-if="response" class="flex flex-col items-center gap-4">
      <span>
        {{ formatPercentage(bertPredictions[1]) }}
        {{ t("toxicCommentAnalyser.formProbabilityLabel") }}
      </span>
      <span v-if="response.perspective_score" class="text-xs">
        {{
          formatPercentage(response.perspective_score, {
            maximumFractionDigits: 2,
          })
        }}
        Perspective API Score
      </span>
      <PercentageBar :probability="bertPredictions[1]" />

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
  </div>
</template>
