<!-- eslint-disable -->
<script setup lang="ts">
const { name, description } = useSite()
const title = `文章列表 | ${name}`

useSeoMeta({
  title,
  ogTitle: title,
  twitterTitle: title,
  description,
  ogDescription: description,
})

const { data: posts } = await useAsyncData('blogs', () =>
  queryCollection('blog').order('date', 'DESC').all(),
)

const postsByYear = computed(() => {
  const groups: Record<string, typeof posts.value> = {}
  for (const post of posts.value || []) {
    const year = new Date(post.date).getFullYear().toString()
    if (!groups[year]) groups[year] = []
    groups[year].push(post)
  }
  return Object.entries(groups)
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([year, posts]) => ({ year, posts }))
})
</script>

<template>
  <NuxtLayout name="default">
    <template #topic-text>
      Blog
    </template>
    <template #full-width>
      <AppRandomSentence />
    </template>
    <template #right>
      <aside
        class="sticky top-10 hidden h-fit w-50 shrink-0 flex-col gap-3.75 px-3.75 py-10 md:flex md:w-60 lg:w-75"
      >
        <AppWechatCard />
        <AppPostAd
          clickable
          variant="filled"
          target="_blank"
          to="https://qm.qq.com/q/c2bJHbwTDy"
          title="来 QQ 群看看？"
          desc="一起交流新鲜事！"
        >
          <Icon name="mingcute:qq-fill" />
        </AppPostAd>
        <AppPostAd
          clickable
          variant="filled"
          target="_blank"
          to="https://chat.csbig.top/"
          title="隆重推出 Carbon Chat"
          desc="在线与多种 LLM 大模型聊天"
        >
          <Icon name="hugeicons:chat-gpt" />
        </AppPostAd>
      </aside>
    </template>
    <main
      class="w-full overflow-hidden py-10 contain-inline-size md:mx-auto md:max-w-2xl lg:max-w-3xl"
    >
      <div v-for="group in postsByYear" :key="group.year" class="year-group mb-10">
        <h2 class="year-title">
          {{ group.year }}
        </h2>
        <ul class="flex flex-col">
          <li v-for="post in group.posts" :key="post.id" class="">
            <AppMotionCard>
              <NuxtLink
                :to="post.path"
                class="flex items-baseline gap-2 py-2 opacity-60 transition-opacity duration-200 hover:opacity-100"
              >
                <h3 class="text-xl font-semibold">
                  {{ post.title }}
                </h3>
                <small class="shrink-0 text-sm text-on-surface opacity-50">
                  <NuxtTime
                    :datetime="new Date(post.update ?? post.date)"
                    year="numeric"
                    month="short"
                    day="numeric"
                  />
                </small>
              </NuxtLink>
            </AppMotionCard>
          </li>
        </ul>
      </div>
      <div class="mt-5 flex flex-col">
        <NuxtLink to="/" class="return-button">
          <code>> cd ..</code>
        </NuxtLink>
      </div>
    </main>
  </NuxtLayout>
</template>

<style scoped lang="less">
.year-group {
  & > .year-title:first-child {
    margin-top: 0;
  }

  & > .year-title {
    width: fit-content;
    color: transparent;
    cursor: pointer;
    font-size: 6em;
    font-weight: 700;
    text-align: left;
    margin: 30px 0 -30px;
    margin-top: 30px;
    margin-bottom: -30px;
    -webkit-mask-image: linear-gradient(#fff 50%, transparent);
    mask-image: linear-gradient(#fff 0%, transparent);
    -webkit-text-stroke: 0.5px rgba(var(--mdui-color-primary), 1);
    font-variant-alternates: styleset(open-digits, round-quotes-and-commas);
  }
}
</style>
