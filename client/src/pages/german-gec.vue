<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";

import { Button } from "@/components/ui/button";
import { useDefaultApi } from "@/composables/useDefaultApi";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardTitle } from "@/components/ui/card";

import type { GECPipelineResponse } from "@/api";
import CardContent from "@/components/ui/card/CardContent.vue";

const inputText = ref("");
const response = ref<GECPipelineResponse | null>(null);
const loading = ref(false);

const api = useDefaultApi();
const { t } = useI18n();

const onCorrectSentenceClick = async () => {
  if (!inputText.value.trim()) return;

  response.value = null;

  try {
    loading.value = true;

    const { data } = await api.gecGermanApiGecGermanPost({
      sentence: inputText.value,
    });
    response.value = data;
  } catch (error) {
    console.error("Error while GEC pipeline", error);
    toast.error(t("gecGerman.error.title"), {
      description: t("gecGerman.error.description"),
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
      <Label>{{ t("gecGerman.inputLabel") }}</Label>
      <Textarea v-model="inputText" @keydown.enter="onCorrectSentenceClick" />

      <Button
        @click="onCorrectSentenceClick"
        :disabled="loading"
        class="self-end rounded-xl"
        :class="{ 'ai-border ai-border-animate': loading }"
      >
        {{ t("gecGerman.buttonTitle") }}
      </Button>
    </div>

    <!-- Model Cards -->
    <div v-if="response" class="flex justify-between gap-4">
      <div class="w-1/2">
        <Card
          class="flex justify-center items-center p-4 relative bg-background"
        >
          <CardTitle class="flex items-center">
            {{ t("gecGerman.originalLabel") }}
          </CardTitle>
          <CardContent>
            {{ response.original_sentence }}
          </CardContent>
        </Card>
      </div>

      <div class="w-1/2">
        <Card
          class="flex justify-center items-center p-4 relative ai-border ai-border-animate bg-background"
        >
          <CardTitle class="flex items-center">
            {{ t("gecGerman.correctedLabel") }}
          </CardTitle>
          <CardContent>
            {{ response.corrected_sentence }}
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
