<script lang="ts" setup>
const { data: advs } = await useAsyncData('indexAdvs', () => queryCollection('indexAdvs').first(), {
  server: true,
  lazy: false,
  getCachedData: key => useNuxtApp().payload.data[key] || useNuxtApp().static.data[key],
})

const items = computed(() => advs.value?.body ?? [])
</script>

<template>
  <section aria-label="Why CSBigCaptain Blog" class="border-t border-outline-variant">
    <div class="flex h-70 w-full flex-col items-start justify-center px-5 md:px-15">
      <h2
        class="w-40 text-3xl leading-10 font-normal uppercase md:w-full md:text-5xl md:leading-16"
      >
        Why CSBigCaptain Blog?
      </h2>
      <p class="pt-4 text-base md:text-lg">
        本博客代码已在 Github 开源，欢迎部署体验！
      </p>
    </div>
    <div
      class="grid w-full grid-cols-1 gap-px border-y border-outline-variant bg-outline-variant md:grid-cols-2"
    >
      <div
        v-for="(item, index) in items"
        :key="item.title"
        class="relative bg-surface px-5 py-8 align-top md:px-8"
      >
        <span
          class="absolute top-6 right-6 text-sm font-semibold tracking-tighter text-on-surface-variant opacity-20"
        >
          {{ String(index + 1).padStart(2, '0') }}
        </span>
        <h3 class="pb-2 text-2xl font-semibold text-on-surface">
          {{ item.title }}
        </h3>
        <div class="detail text-on-surface-variant">
          {{ item.detail }}
        </div>
      </div>
    </div>
    <div class="link flex items-center justify-center px-5 pt-7 pb-14 md:pb-20">
      <AppLinkButton
        icon="mdi:github"
        href="https://github.com/CSBigCaptain/csbigcaptain.github.io"
        end-icon="mdi:open-in-new"
        target="_blank"
        variant="filled"
      >
        View Github Repository
      </AppLinkButton>
    </div>
  </section>
</template>
