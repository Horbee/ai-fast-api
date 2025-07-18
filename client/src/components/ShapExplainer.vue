<script setup lang="ts">
import { computed } from "vue";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import type { ShapValues } from "@/api";

const { shapValues } = defineProps<{ shapValues: ShapValues }>();

// Function to get color based on SHAP value for the offensive class (index 1)
const getTokenColor = (shapValue: number, maxAbsValue: number) => {
  // Normalize the value to [-1, 1] range
  const normalizedValue = shapValue / maxAbsValue;

  if (normalizedValue > 0) {
    // Positive influence on offensive class -> Red
    const intensity = Math.min(normalizedValue, 1);
    return `rgba(239, 68, 68, ${0.2 + intensity * 0.8})`; // Red with varying opacity
  } else {
    // Negative influence on offensive class -> Blue
    const intensity = Math.min(Math.abs(normalizedValue), 1);
    return `rgba(59, 130, 246, ${0.2 + intensity * 0.8})`; // Blue with varying opacity
  }
};

// Get SHAP values for the offensive class (index 1) and find max absolute value for normalization
const offensiveClassValues = shapValues.values.map(
  (valueArray) => valueArray[1] || 0
);
const maxAbsValue = Math.max(...offensiveClassValues.map(Math.abs));

const formattedBaseValues = computed(() => {
  return shapValues.base_values.map((value) => value.toFixed(2));
});
</script>

<template>
  <div class="max-w-full">
    <h3 class="text-sm text-center font-semibold mb-4">
      SHAP Values - Token Influence on Offensive Classification
    </h3>

    <!-- Legend -->
    <div class="flex items-center gap-4 mb-4 text-sm">
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 bg-blue-500 rounded"></div>
        <span class="text-xs dark:text-gray-300"
          >Reduces offensive prediction</span
        >
      </div>
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 bg-red-500 rounded"></div>
        <span class="text-xs dark:text-gray-300"
          >Increases offensive prediction</span
        >
      </div>
    </div>

    <!-- Tokens with color coding -->
    <div class="flex flex-wrap gap-1 p-4 border rounded-lg dark:bg-gray-800">
      <span
        v-for="(token, index) in shapValues.data"
        :key="index"
        :style="{
          backgroundColor: getTokenColor(
            offensiveClassValues[index],
            maxAbsValue
          ),
        }"
        class="px-2 py-1 rounded text-sm font-medium border"
        :title="`Token: ${token}, SHAP value: ${offensiveClassValues[
          index
        ]?.toFixed(4)}`"
      >
        {{ token }}
      </span>
    </div>

    <!-- Detailed values table (optional, can be collapsed) -->
    <Accordion class="mt-4" type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger class="cursor-pointer text-sm font-medium">
          Show detailed SHAP values
        </AccordionTrigger>
        <AccordionContent class="mt-2 overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead>
              <tr>
                <th class="px-3 py-2 text-left">Token</th>
                <th class="px-3 py-2 text-right">
                  SHAP Value (Offensive Class)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(token, index) in shapValues.data"
                :key="index"
                class="border-t"
              >
                <td class="px-3 py-2">{{ token }}</td>
                <td class="px-3 py-2 text-right font-mono">
                  {{ offensiveClassValues[index]?.toFixed(4) }}
                </td>
              </tr>
              <tr>
                <td class="px-3 py-2">Base Values</td>
                <td class="px-3 py-2 text-right font-mono">
                  {{
                    formattedBaseValues
                      .map((value, index) => `${index}: ${value}`)
                      .join(", ")
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>
