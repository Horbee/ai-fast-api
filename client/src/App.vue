<script setup lang="ts">
import CardAnalyser from "@/components/CardAnalyser.vue";
import ImageAnalyser from "@/components/ImageAnalyser.vue";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Toaster from "@/components/ui/toast/Toaster.vue";
</script>

<template>
  <div class="flex flex-col gap-4 items-center p-4">
    <Tabs
      default-value="card"
      class="flex flex-col items-center justify-center"
    >
      <TabsList>
        <TabsTrigger value="card"> {{ $t("cardAnalyser.name") }} </TabsTrigger>
        <TabsTrigger value="image">
          {{ $t("imageAnalyser.name") }}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="card">
        <CardAnalyser />
      </TabsContent>
      <TabsContent value="image">
        <ImageAnalyser />
      </TabsContent>
    </Tabs>
  </div>
  <Toaster />
</template>
