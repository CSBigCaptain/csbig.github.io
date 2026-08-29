<script lang="ts" setup>
const { name } = useSite()

const title = `链接 | ${name}`
const description = '此页面记录了博主其他朋友的博客，以及一些使用的网页工具'

useSeoMeta({
  title,
  ogTitle: title,
  twitterTitle: title,
  description,
  ogDescription: description,
  twitterDescription: description,
})

const { data: friendsData } = await useAsyncData('linkPageFriends', () =>
  queryCollection('linkPageFriends').first())
const { data: toolsData } = await useAsyncData('linkPageTools', () =>
  queryCollection('linkPageTools').first())
</script>

<template>
  <NuxtLayout name="default">
    <template #topic-text>
      Link
    </template>
    <main class="min-h-[70vh] py-12">
      <section class="friends">
        <h2>友情链接</h2>
        <ul>
          <li v-for="friend in friendsData?.links" :key="friend.title">
            <LinkPageCard
              :author="friend.author"
              :comment="friend.comment"
              :date="friend.date"
              :title="friend.title"
              :nick="friend.nick"
              :desc="friend.desc"
              :icon="friend.icon"
              :to="friend.link"
            />
          </li>
        </ul>
      </section>
      <section class="tools">
        <h2>工具集</h2>
        <ul>
          <li v-for="tool in toolsData?.links" :key="tool.title">
            <LinkPageCard
              :date="tool.date"
              :title="tool.title"
              :nick="tool.nick"
              :desc="tool.desc"
              :icon="tool.icon"
              :to="tool.link"
            />
          </li>
        </ul>
      </section>
      <section class="mt-8">
        <ul>
          <NuxtLink to="/" class="return-button">
            <code>> cd ..</code>
          </NuxtLink>
        </ul>
      </section>
    </main>
  </NuxtLayout>
</template>

<style lang="less" scoped>
section {
  & > h2 {
    width: fit-content;
    margin: 0 auto;
    color: transparent;
    cursor: pointer;
    font-size: 5em;
    font-weight: 700;
    margin-top: 30px;
    margin-bottom: -50px;
    text-align: center;
    -webkit-mask-image: linear-gradient(#fff 50%, transparent);
    mask-image: linear-gradient(#fff 0%, transparent);
    -webkit-text-stroke: 0.5px rgba(var(--mdui-color-primary), 0.5);
    transition: all 0.3s ease-in-out;
    transition-delay: 150ms;
  }

  &:hover > h2 {
    color: rgba(var(--mdui-color-primary), 0.5);
    -webkit-text-stroke: 0.5px transparent;
    transition-delay: 150ms;
  }
}

ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, 240px);
  justify-content: center;
  padding: 0;
  gap: 15px;
}
@media (max-width: 767px) {
  ul {
    grid-template-columns: repeat(auto-fill, 120px);
  }
}
</style>
