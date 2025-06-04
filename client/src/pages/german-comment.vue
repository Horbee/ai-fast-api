<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

import PercentageBar from "@/components/PercentageBar.vue";
import { Button } from "@/components/ui/button";
import { useDefaultApi } from "@/composables/useDefaultApi";
import { useToast } from "@/components/ui/toast/use-toast";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardTitle } from "@/components/ui/card";

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

const bertPredictions = computed(
  () => response.value?.predictions.bert_cased_v4_probabilities || []
);

const electraPredictions = computed(
  () =>
    response.value?.predictions.electra_uncased_downsampled_probabilities || []
);

const ensemblePredictions = computed(() => {
  const nonOffensive =
    (bertPredictions.value[0] + electraPredictions.value[0]) / 2;
  const offensive =
    (bertPredictions.value[1] + electraPredictions.value[1]) / 2;

  return {
    nonOffensive,
    offensive,
  };
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
  <div class="max-w-lg w-full mx-auto">
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
      class="text-base text-muted-foreground text-center mb-8"
    >
      {{ sentCommentText }}
    </p>

    <!-- Model Cards -->
    <div v-if="sentCommentText" class="flex justify-between gap-4">
      <div class="w-1/2">
        <Card
          class="flex justify-center items-center p-6 relative ai-border ai-border-animate bg-background"
        >
          <CardTitle>BERT</CardTitle>
        </Card>

        <p
          v-if="response"
          class="text-sm text-muted-foreground text-center my-2"
        >
          Offensive Score: {{ formatPercentage(bertPredictions[1]) }}
        </p>
      </div>

      <div class="w-1/2">
        <Card
          class="flex justify-center items-center p-6 relative ai-border ai-border-animate bg-background"
        >
          <CardTitle>ELECTRA</CardTitle>
        </Card>

        <p
          v-if="response"
          class="text-sm text-muted-foreground text-center my-2"
        >
          Offensive Score: {{ formatPercentage(electraPredictions[1]) }}
        </p>
      </div>
    </div>

    <!-- Response and feedback -->
    <div v-if="response" class="flex flex-col items-center gap-4 mt-8">
      <span>
        {{ t("toxicCommentAnalyser.formProbabilityLabel") }}:
        {{ formatPercentage(ensemblePredictions.offensive) }}
      </span>
      <span v-if="response.perspective_score" class="text-xs">
        {{
          formatPercentage(response.perspective_score, {
            maximumFractionDigits: 2,
          })
        }}
        Perspective API Score
      </span>
      <PercentageBar
        :probability="ensemblePredictions.offensive"
        fill-class="ai-gradient"
      />

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

<style scoped>
.ai-gradient {
  background: linear-gradient(
    45deg,
    #6366f1,
    #8b5cf6,
    #e11d48,
    #fb7185,
    #4f46e5,
    #6366f1
  );
  background-size: 250% 250%;
}

.ai-border {
  position: relative;
  border: none;
}

@keyframes borderRotate {
  from {
    background-position: 0% 0%;
  }
  to {
    background-position: 200% 200%;
  }
}

.ai-border::before {
  background: linear-gradient(
    45deg,
    #6366f1,
    #8b5cf6,
    #e11d48,
    #fb7185,
    #4f46e5,
    #6366f1
  );
  background-size: 250% 250%;
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 0.75rem;
  padding: 2px;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.ai-border-animate::before {
  animation: borderRotate 3s linear infinite;
}
</style>
