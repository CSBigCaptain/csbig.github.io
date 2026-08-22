<script setup lang="ts">
const tags = [
  { label: '数码', icon: 'ic:baseline-devices' },
  { label: 'Vue', icon: 'carbon:logo-vue' },
  { label: 'TypeScript', icon: 'akar-icons:typescript-fill' },
  { label: '游戏', icon: 'ic:baseline-sports-esports' },
  { label: '设计', icon: 'ic:baseline-palette' },
]
</script>

<template>
  <section aria-label="Introduction" class="px-5 py-8 md:px-15">
    <h2 class="py-8 text-5xl font-normal uppercase">
      About Me
    </h2>
    <ul aria-label="兴趣与技术标签" class="flex flex-wrap gap-2 pb-6">
      <li v-for="tag in tags" :key="tag.label">
        <span
          class="tag-chip relative isolate inline-flex cursor-pointer items-center gap-2 border border-outline-variant px-3 py-1.5 text-sm leading-5 text-on-surface-variant select-none"
        >
          <span class="tag-chip__bg pointer-events-none absolute inset-0 -z-1" aria-hidden="true" />
          <Icon :name="tag.icon" class="text-[1.05rem]" />
          {{ tag.label }}
        </span>
      </li>
    </ul>
    <div class="py-4 leading-relaxed">
      <p>
        我是一名食品科学与工程专业的学生，正在钻研前端技术 & <del>准备考研</del>。目前正在研究 Nuxt
        企业级应用开发和 Monorepo 项目。
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
    </div>
  </section>
</template>

<style lang="less" scoped>
.tag-chip {
  transition:
    color 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  .tag-chip__bg {
    background-image: linear-gradient(
      120deg,
      color-mix(in srgb, rgb(var(--mdui-color-secondary)) 12%, transparent),
      color-mix(in srgb, rgb(var(--mdui-color-tertiary)) 12%, transparent)
    );
  }

  &:hover {
    color: rgb(var(--mdui-color-on-surface));
    border-color: rgb(var(--mdui-color-secondary));
    box-shadow: var(--mdui-elevation-level2);
  }
}
</style>
