<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

import ThemeSelector from "@/components/ThemeSelector.vue";

import Toaster from "@/components/ui/toast/Toaster.vue";
import { Icon } from "@iconify/vue";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
</script>

<template>
  <header class="bg-background/80 backdrop-blur-lg border-b border-border">
    <div
      class="container px-2 md:px-8 flex h-14 max-w-screen-2xl items-center justify-between"
    >
      <Drawer direction="left">
        <DrawerTrigger class="md:hidden flex">
          <Button variant="ghost" size="icon">
            <Icon
              icon="radix-icons:hamburger-menu"
              class="h-[1.2rem] w-[1.2rem]"
            />
          </Button>
        </DrawerTrigger>
        <DrawerContent class="h-full w-9/12 rounded-none">
          <DrawerHeader class="text-left ml-2 mt-2">
            <DrawerTitle>AI Showcase</DrawerTitle>
            <DrawerClose class="absolute top-1 right-1">
              <Button variant="ghost" size="icon">
                <Icon
                  icon="radix-icons:cross-1"
                  class="h-[1rem] w-[1rem] text-muted-foreground"
                />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          <nav class="flex flex-col space-y-3 my-4 pl-6">
            <DrawerClose as-child>
              <RouterLink
                to="/titanic"
                class="transition-colors hover:text-foreground/80 text-foreground/60"
                activeClass="!text-foreground shadow-sm"
              >
                {{ $t("titanicPredictor.name") }}
              </RouterLink>
            </DrawerClose>
            <DrawerClose as-child>
              <RouterLink
                to="/rain"
                class="transition-colors hover:text-foreground/80 text-foreground/60"
                activeClass="!text-foreground shadow-sm"
              >
                {{ $t("rainPredictor.name") }}
              </RouterLink>
            </DrawerClose>
            <DrawerClose as-child>
              <RouterLink
                to="/german-comment"
                class="transition-colors hover:text-foreground/80 text-foreground/60"
                activeClass="!text-foreground shadow-sm"
              >
                {{ $t("toxicCommentAnalyser.name") }}
              </RouterLink>
            </DrawerClose>
            <DrawerClose as-child>
              <RouterLink
                to="/tweet"
                class="transition-colors hover:text-foreground/80 text-foreground/60"
                activeClass="!text-foreground shadow-sm"
              >
                {{ $t("tweetAnalyser.name") }}
              </RouterLink>
            </DrawerClose>
            <DrawerClose as-child>
              <RouterLink
                to="/card"
                class="transition-colors hover:text-foreground/80 text-foreground/60"
                activeClass="!text-foreground shadow-sm"
              >
                {{ $t("cardAnalyser.name") }}
              </RouterLink>
            </DrawerClose>
          </nav>
        </DrawerContent>
      </Drawer>

      <div class="mr-4 md:mr-1 hidden md:flex">
        <nav
          class="flex items-center max-lg:space-x-4 space-x-6 text-sm font-medium"
        >
          <RouterLink
            to="/titanic"
            class="transition-colors hover:text-foreground/80 text-foreground/60"
            activeClass="!text-foreground shadow-sm"
          >
            {{ $t("titanicPredictor.name") }}
          </RouterLink>
          <RouterLink
            to="/rain"
            class="transition-colors hover:text-foreground/80 text-foreground/60"
            activeClass="!text-foreground shadow-sm"
          >
            {{ $t("rainPredictor.name") }}
          </RouterLink>
          <RouterLink
            to="/tweet"
            class="transition-colors hover:text-foreground/80 text-foreground/60"
            activeClass="!text-foreground shadow-sm"
          >
            {{ $t("tweetAnalyser.name") }}
          </RouterLink>
          <RouterLink
            to="/german-comment"
            class="transition-colors hover:text-foreground/80 text-foreground/60"
            activeClass="!text-foreground shadow-sm"
          >
            {{ $t("toxicCommentAnalyser.name") }}
          </RouterLink>
          <RouterLink
            to="/card"
            class="transition-colors hover:text-foreground/80 text-foreground/60"
            activeClass="!text-foreground shadow-sm"
          >
            {{ $t("cardAnalyser.name") }}
          </RouterLink>
        </nav>
      </div>
      <ThemeSelector />
    </div>
  </header>

  <div class="flex flex-col gap-4 items-center p-4">
    <RouterView />
  </div>

  <Toaster />
</template>
