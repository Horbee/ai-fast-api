<script setup lang="ts">
import pictureSvg from "@/assets/picture.svg";
import { readFilePromise } from "@/lib/utils";
import { ref } from "vue";

const imageInput = ref<HTMLInputElement | null>(null);
const imageSrc = ref<string | null>(null);

withDefaults(defineProps<{ placeholderIcon?: string }>(), {
  placeholderIcon: pictureSvg,
});
const emits = defineEmits<{ select: [file: File] }>();

const selectFile = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const files = target?.files;
  if (files) {
    const file = files[0];
    emits("select", file);
    imageSrc.value = await readFilePromise(file);
    if (imageInput.value) {
      imageInput.value.value = "";
    }
  }
};
</script>

<template>
  <div
    class="w-[250px] min-h-[250px] bg-slate-300 hover:bg-slate-300/80 border rounded-md border-dashed border-gray-500 cursor-pointer flex items-center justify-center"
    :class="{ 'border-0': imageSrc }"
    @click="imageInput?.click()"
  >
    <img v-if="imageSrc" :src="imageSrc" class="w-full" />
    <img v-else :src="placeholderIcon" width="75" height="75" />

    <input
      ref="imageInput"
      type="file"
      accept="image/*"
      @change="selectFile"
      hidden
    />
  </div>
</template>
