<script setup lang="ts">
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

import PercentageBar from "@/components/PercentageBar.vue";
import { Button } from "@/components/ui/button";
import { useDefaultApi } from "@/composables/useDefaultApi";
import { useToast } from "@/components/ui/toast/use-toast";
import { Label } from "@/components/ui/label";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";
import { formatPercentage } from "@/lib/utils";

const formData = reactive({ temp: 20, humidity: 60, pressure: 1009 });
const probability = ref<number | null>(null);
const loading = ref(false);

const api = useDefaultApi();
const { toast } = useToast();
const { t } = useI18n();

const onClick = async () => {
  try {
    loading.value = true;

    const { data } = await api.rainApiRainPost(formData);
    probability.value = data.probability;
  } catch (error) {
    console.error("Error while predicting response", error);
    toast({
      title: t("rainPredictor.error.title"),
      description: t("rainPredictor.error.description"),
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
      {{ t("rainPredictor.description") }}
    </blockquote>

    <div class="flex flex-col gap-4 w-full">
      <NumberField v-model="formData.temp">
        <Label> {{ t("rainPredictor.input.temp.label") }} </Label>
        <NumberFieldContent>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldContent>
      </NumberField>

      <NumberField v-model="formData.humidity" :min="0" :max="100">
        <Label> {{ t("rainPredictor.input.humidity.label") }} </Label>
        <NumberFieldContent>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldContent>
      </NumberField>

      <NumberField v-model="formData.pressure">
        <Label> {{ t("rainPredictor.input.pressure.label") }} </Label>
        <NumberFieldContent>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldContent>
      </NumberField>
    </div>

    <Button @click="onClick" :disabled="loading">
      {{ t("rainPredictor.buttonTitle") }}
    </Button>

    <div v-if="probability" class="flex flex-col items-center gap-4">
      <span>
        {{ t("rainPredictor.formProbabilityLabel") }}
        {{ formatPercentage(probability) }}
      </span>
      <PercentageBar :probability="probability" />
    </div>
  </div>
</template>
