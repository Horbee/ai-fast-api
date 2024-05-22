<script setup lang="ts">
import { ref } from "vue";

import Dropzone from "@/components/Dropzone.vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDefaultApi } from "@/composables/useDefaultApi";
import { useToast } from "@/components/ui/toast/use-toast";

const image = ref<File | null>(null);
const question = ref("");
const loading = ref(false);

const response = ref<{ answer: string; question: string } | null>(null);

const { toast } = useToast();
const api = useDefaultApi();

const onClick = async () => {
  if (!image.value || !question.value) return;

  response.value = null;

  try {
    loading.value = true;

    const { data } = await api.askApiAskPost(question.value, image.value);
    response.value = { answer: data.answer, question: question.value };
    question.value = "";
  } catch (error) {
    console.error("Error while analysing image", error);
    toast({
      title: "Uh oh! Something went wrong.",
      description: "Error while analysing image",
      variant: "destructive",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col gap-4 items-center p-4">
    <Dropzone @select="(file) => (image = file)" />
    <Input v-model="question" />
    <Button @click="onClick" :disabled="!image || loading">Ask</Button>

    <div
      v-if="!!response"
      class="w-[250px] min-h-[50px] bg-slate-300 border rounded-md border-gray-500 cursor-pointer flex flex-col items-center justify-center"
    >
      <p class="text-sm italic">{{ response.question }}</p>
      <p>- {{ response.answer }}</p>
    </div>
  </div>
</template>
