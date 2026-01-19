<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { useDefaultApi } from "@/composables/useDefaultApi";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardTitle } from "@/components/ui/card";

import type { GECPipelineResponse } from "@/api";
import CardContent from "@/components/ui/card/CardContent.vue";
import LanguageConfirmationDialog from "@/components/LanguageConfirmationDialog.vue";

const inputText = ref("");
const response = ref<GECPipelineResponse | null>(null);
const loading = ref(false);
const model = ref<"ministral-3" | "mt5">("ministral-3");
const isLanguageDialogOpen = ref(false);

const api = useDefaultApi();
const { t } = useI18n();

const onCorrectSentenceClick = async (force: boolean = false) => {
  if (!inputText.value.trim()) return;

  response.value = null;

  try {
    loading.value = true;

    const { data } = await api.gecGermanApiGecGermanPost({
      text: inputText.value,
      model: model.value,
      force,
    });

    if (!data.corrected_sentence && data.language !== "de") {
      isLanguageDialogOpen.value = true;
      return;
    }

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
    <LanguageConfirmationDialog
      v-model="isLanguageDialogOpen"
      @continue="onCorrectSentenceClick(true)"
    />

    <div class="flex flex-col items-center gap-6">
      <h1 class="text-xl font-semibold text-white">
        {{ t("gecGerman.modelSelectLabel") }}
      </h1>
      <ButtonGroup class="w-full">
        <Button
          variant="outline"
          size="lg"
          class="w-1/2 px-6 py-2 rounded-md text-sm font-medium bg-slate-600 text-white shadow-sm"
          :class="{
            'bg-linear-to-r from-blue-600 to-purple-600':
              model === 'ministral-3',
          }"
          @click="model = 'ministral-3'"
        >
          Ministral-3
        </Button>
        <Button
          variant="outline"
          size="lg"
          class="w-1/2 px-6 py-2 rounded-md text-sm font-medium bg-slate-600 text-white shadow-sm"
          :class="{
            'bg-linear-to-r from-blue-600 to-purple-600': model === 'mt5',
          }"
          @click="model = 'mt5'"
        >
          mt5
        </Button>
      </ButtonGroup>
    </div>

    <!-- FORM -->
    <div class="flex flex-col gap-4 w-full my-4">
      <Textarea
        v-model="inputText"
        :placeholder="t('gecGerman.inputLabel')"
        @keydown.enter="onCorrectSentenceClick()"
        class="h-[150px]"
      />

      <Button
        @click="onCorrectSentenceClick()"
        disabled
        class="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
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
