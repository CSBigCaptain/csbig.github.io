<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(`blog-${route.path}`, () => {
  return queryCollection('blog').path(route.path).first()
})

const { name, description: siteDescription } = useSite()

const title = `${post.value?.title || 'Blog'} | ${name}`
const description = post.value?.description || siteDescription

useSeoMeta({
  title,
  ogTitle: title,
  twitterTitle: title,
  description,
  ogDescription: description,
  twitterDescription: description,
})
</script>

<template>
  <NuxtLayout name="default">
    <template #topic-text>
      Blog
    </template>
    <template #full-width>
      <div
        class="title-wrapper flex h-[45vh] w-full flex-col items-center justify-center bg-surface-container-highest"
      >
        <h1 v-if="post" class="mb-2 w-[80%] text-center text-4xl font-light text-on-surface">
          {{ post.title }}
        </h1>
        <div v-if="post" class="text-color-thirdary mt-2 text-sm">
          <span class="mr-1 inline-block scale-80 font-extrabold select-none">[</span>
          <NuxtTime :datetime="new Date(post.date)" />
          <span class="ml-1 inline-block scale-80 font-extrabold select-none">]</span>
        </div>
      </div>
    </template>
    <template #right>
      <aside
        class="sticky top-10 hidden h-fit w-50 shrink-0 flex-col gap-3.75 px-3.75 py-10 md:flex md:w-75"
      >
        <AppWechatCard />
        <AppPostToc v-if="post?.body?.toc?.links?.length" :post="post" />
      </aside>
    </template>
    <main class="min-h-screen w-full py-10 md:mx-auto md:max-w-3xl">
      <div class="wrap-break-word">
        <ContentRenderer v-if="post" :value="post" />
        <AppPostShareCard
          v-if="post"
          class="mt-8"
          :title="post.title"
          :url="useSite().url + route.path"
          :description="post.description"
        />
        <div class="mt-5 flex flex-col gap-1 text-on-surface-variant">
          <NuxtLink to="/blog" class="return-button">
            <code>> cd ..</code>
          </NuxtLink>
          <NuxtLink to="/" class="return-button">
            <code>> cd /</code>
          </NuxtLink>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>

<style lang="less">
@import url('katex/dist/katex.min.css');

// 解决sticky元素遮挡问题
mdui-layout,
mdui-layout-main {
  overflow: visible;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  scroll-margin-top: 80px;
}
</style>
