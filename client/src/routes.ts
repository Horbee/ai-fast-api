import { createWebHistory, createRouter } from "vue-router";

import ImageAnalyser from "@/components/ImageAnalyser.vue";
import CardAnalyser from "@/components/CardAnalyser.vue";
import TitanicPredictor from "@/components/TitanicPredictor.vue";

const routes = [
  { path: "/", redirect: "/titanic" },
  { path: "/titanic", name: "titanic", component: TitanicPredictor },
  { path: "/card", name: "card", component: CardAnalyser },
  { path: "/image", name: "image", component: ImageAnalyser },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
