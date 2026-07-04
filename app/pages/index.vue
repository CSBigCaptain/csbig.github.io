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

const { data: posts } = await useAsyncData(
  'featuredPosts',
  () => {
    return queryCollection('blog').where('isFeatured', '=', true).order('date', 'DESC').all()
  },
  {
    server: true,
    lazy: false,
    getCachedData: key => useNuxtApp().payload.data[key] || useNuxtApp().static.data[key],
  },
)
const { data: advs } = await useAsyncData(
  'indexAdvs',
  () => {
    return queryCollection('indexAdvs').first()
  },
  {
    server: true,
    lazy: false,
    getCachedData: key => useNuxtApp().payload.data[key] || useNuxtApp().static.data[key],
  },
)
</script>

<template>
  <NuxtLayout>
    <template #topic-text>
      首页
    </template>
    <template #full-width>
      <IndexHeroSection />
      <IndexSocialGrid />
    </template>
    <main class="mx-auto w-full p-3.75 md:w-[80%]">
      <section aria-label="Introduction" class="intro">
        <AppField label="介绍">
          <p>
            我是一名食品科学与工程专业的学生，正在钻研前端技术 & <del>准备考研</del>。目前正在研究
            Nuxt 企业级应用开发和 Monorepo 项目。
          </p>
          <p>Nuxt 是我使用最多的 JavaScript 框架。此外，我对 Vue 3 有一定的了解。</p>
          <p>
            在学习之外，我喜欢玩一些网游，偶尔会玩一些独立游戏。此外，我曾研究过摄影技术，不过现在这些设备已经吃灰了。
          </p>
          <p>
            CSBigCaptain 昵称的来历是我初中时玩游戏用的名字“陈帅哥大队长”，注册 Steam
            账号的时候就翻译成英文填进去了。Yeshang
            Ji（姬夜殇）这个名字源自我初中读的唐家三少的小说《酒神》。
          </p>
          <p>如果你在沙🍐读书，那么我们可能会有很多共同话题，欢迎来联系我！</p>
        </AppField>
      </section>
      <section area-label="Blogs" class="pb-5">
        <AppField label="精选文章">
          <ul class="grid grid-cols-1 gap-5 overflow-hidden md:grid-cols-2 2xl:grid-cols-3">
            <li v-for="post in posts" :key="post.id">
              <AppFeaturedCard
                :description="post.description"
                :link="post.path"
                :title="post.title"
                :date="post.date"
              />
            </li>
          </ul>
        </AppField>
      </section>
      <section aria-label="Why CSBigCaptain Blog" class="why min-h-screen pt-[10%]">
        <h2 class="text-center text-4xl/16 font-semibold">
          Why CSBigCaptain Blog?
        </h2>
        <p class="py-2 text-center text-lg">
          本博客代码已在 Github 开源，欢迎部署体验！
        </p>
        <ul class="grid grid-cols-1 gap-5 pt-5 md:grid-cols-2 2xl:grid-cols-4">
          <li v-for="item in advs?.body" :key="item.title">
            <AppMotionCard class="motion-card h-full">
              <mdui-card variant="filled" class="h-full w-full p-6">
                <h3 class="pb-4 text-2xl font-bold">
                  {{ item.title }}
                </h3>
                <div class="detail">
                  {{ item.detail }}
                </div>
              </mdui-card>
            </AppMotionCard>
          </li>
        </ul>
        <AppMotionCard class="link flex items-center justify-center pt-7">
          <AppLinkButton
            icon="mdi:github"
            href="https://github.com/CSBigCaptain/csbigcaptain.github.io"
            end-icon="mdi:open-in-new"
            target="_blank"
            variant="filled"
          >
            View Github Repository
          </AppLinkButton>
        </AppMotionCard>
      </section>
    </main>
  </NuxtLayout>
</template>

<style lang="less" scoped>
/* 背景花纹行：nth-child 偏移 */
.pattern-row {
  display: flex;
  white-space: nowrap;

  &:nth-child(4n + 1) {
    margin-left: 0;
  }
  &:nth-child(4n + 2) {
    margin-left: -8%;
  }
  &:nth-child(4n + 3) {
    margin-left: -20%;
  }
  &:nth-child(4n) {
    margin-left: -12%;
  }
}

/* 花纹文字基础样式 */
.pattern-char {
  flex-shrink: 0;
  font-weight: 700;
  user-select: none;
  pointer-events: none;
}

/* 花纹文字 - 浅色层 */
.pattern-char--light {
  font-size: 3rem;
  letter-spacing: 0.8em;
  line-height: 2;
  color: var(--color-outline-variant);
  opacity: 0.1;
}

/* 花纹文字 - 暗色层 */
.pattern-char--dark {
  font-size: 2.25rem;
  letter-spacing: 0.5em;
  line-height: 1.75;
  color: white;
  opacity: 0.15;
}

/* 中间透明遮罩：让中心文字更易阅读 */
.pattern-mask {
  -webkit-mask-image: radial-gradient(
    ellipse 45% 35% at center,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 25%,
    rgba(0, 0, 0, 1) 60%
  );
  mask-image: radial-gradient(
    ellipse 45% 35% at center,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 25%,
    rgba(0, 0, 0, 1) 60%
  );
}

/* 网格链接共享样式 */
.grid-link {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  transition: background-color 0.3s ease;

  // 右箭头图标动画
  .right {
    transition: all 0.3s ease-in-out;
  }

  &:hover .right {
    margin-left: 0.25em;
  }
}
</style>
