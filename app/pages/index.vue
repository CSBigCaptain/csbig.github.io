<script lang="ts" setup>
const title = `CSBigCaptain (Yeshang Ji)`
useSeoMeta({
  title,
  ogTitle: title,
  twitterTitle: title,
})

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <NuxtLayout>
    <template #topic-text>
      首页
    </template>
    <template #full-width>
      <div class="flex max-h-300 w-full flex-col" style="height: calc(100dvh - 64px)">
        <IndexHeroSection />
        <IndexSocialGrid />
      </div>
    </template>
    <main class="mx-auto w-full border-x-2 border-outline-variant">
      <div class="h-30 border-b border-outline-variant" />
      <IndexAboutMe />
      <IndexFavBlog />
      <IndexWhySection />
    </main>
  </NuxtLayout>
</template>
