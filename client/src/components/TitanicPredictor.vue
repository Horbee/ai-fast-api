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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPercentage } from "@/lib/utils";

const formData = reactive({ pclass: "1", sex: "0", age: 20, family_size: 0 });
const probability = ref<number | null>(null);
const loading = ref(false);

const api = useDefaultApi();
const { toast } = useToast();
const { t } = useI18n();

const onClick = async () => {
  try {
    loading.value = true;

    const { data } = await api.titanicApiTitanicPost({
      pclass: Number(formData.pclass),
      sex: Number(formData.sex),
      age: formData.age,
      family_size: formData.family_size,
    });
    probability.value = data.probability;
  } catch (error) {
    console.error("Error while predicting response", error);
    toast({
      title: t("titanicPredictor.error.title"),
      description: t("titanicPredictor.error.description"),
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
      {{ t("titanicPredictor.description") }}
    </blockquote>

    <div class="flex flex-col gap-4 w-full">
      <Select v-model="formData.pclass">
        <Label> {{ t("titanicPredictor.input.class.label") }} </Label>
        <SelectTrigger>
          <SelectValue placeholder="Select your ticket class" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">
            {{ t("titanicPredictor.input.class.value1") }}
          </SelectItem>
          <SelectItem value="2">
            {{ t("titanicPredictor.input.class.value2") }}
          </SelectItem>
          <SelectItem value="3">
            {{ t("titanicPredictor.input.class.value3") }}
          </SelectItem>
        </SelectContent>
      </Select>

      <Select v-model="formData.sex">
        <Label> {{ t("titanicPredictor.input.sex.label") }} </Label>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">
            {{ t("titanicPredictor.input.sex.value0") }}
          </SelectItem>
          <SelectItem value="1">
            {{ t("titanicPredictor.input.sex.value1") }}
          </SelectItem>
        </SelectContent>
      </Select>

      <NumberField v-model="formData.age" :min="0" :max="80">
        <Label> {{ t("titanicPredictor.input.age.label") }} </Label>
        <NumberFieldContent>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldContent>
      </NumberField>

      <NumberField v-model="formData.family_size" :min="0" :max="5">
        <Label> {{ t("titanicPredictor.input.family_size.label") }} </Label>
        <NumberFieldContent>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldContent>
      </NumberField>
    </div>

    <Button @click="onClick" :disabled="loading">
      {{ t("titanicPredictor.buttonTitle") }}
    </Button>

    <div v-if="probability" class="flex flex-col items-center gap-4">
      <span>
        {{ t("titanicPredictor.formProbabilityLabel") }}
        {{ formatPercentage(probability) }}
      </span>
      <PercentageBar :probability="probability" />
    </div>
  </div>
</template>
