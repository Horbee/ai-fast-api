<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

import ThemeSelector from "@/components/ThemeSelector.vue";

import Toaster from "@/components/ui/toast/Toaster.vue";
</script>

<template>
  <div class="flex flex-col gap-4 items-center p-4">
    <ThemeSelector />

    <div class="flex flex-col items-center justify-center">
      <div
        class="'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground'"
      >
        <RouterLink
          to="/titanic"
          activeClass="bg-background text-foreground shadow-sm"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {{ $t("titanicPredictor.name") }}
        </RouterLink>
        <RouterLink
          to="/rain"
          activeClass="bg-background text-foreground shadow-sm"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {{ $t("rainPredictor.name") }}
        </RouterLink>
        <RouterLink
          to="/card"
          activeClass="bg-background text-foreground shadow-sm"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {{ $t("cardAnalyser.name") }}
        </RouterLink>
      </div>
    </div>

    <RouterView />
  </div>

  <Toaster />
</template>
