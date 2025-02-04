import { createWebHistory, createRouter } from "vue-router";

import CardAnalyser from "@/components/CardAnalyser.vue";
import TitanicPredictor from "@/components/TitanicPredictor.vue";
import RainPredictor from "@/components/RainPredictor.vue";
import TweetAnalyser from "@/components/TweetAnalyser.vue";

const routes = [
  { path: "/", redirect: "/titanic" },
  { path: "/titanic", name: "titanic", component: TitanicPredictor },
  { path: "/rain", name: "rain", component: RainPredictor },
  { path: "/tweet", name: "tweet", component: TweetAnalyser },
  { path: "/card", name: "card", component: CardAnalyser },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
