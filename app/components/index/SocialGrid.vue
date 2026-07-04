<script lang="ts" setup>
import LinkButton from '~/components/app/LinkButton.vue'

const { data: actions } = await useAsyncData(
  'indexActions',
  () => {
    return queryCollection('indexActions').first()
  },
  {
    server: true,
    lazy: false,
    getCachedData: key => useNuxtApp().payload.data[key] || useNuxtApp().static.data[key],
  },
)
</script>

<template>
  <div class="h-40 w-full border-y-2 border-outline-variant">
    <div
      class="grid h-full cursor-pointer grid-cols-2 divide-x-2 divide-outline-variant text-2xl font-semibold"
    >
      <NuxtLink
        to="/blog"
        class="grid-link justify-end font-semibold hover:bg-surface-variant hover:text-on-surface-variant"
      >
        <div class="flex h-full w-full max-w-150 items-center justify-center">
          Read Articles
          <Icon name="ic:baseline-chevron-right" class="right scale-125" />
        </div>
      </NuxtLink>
      <div class="grid-link social-link">
        <div class="relative flex h-full w-full max-w-150 items-center justify-center">
          Social Media
          <Icon name="ic:baseline-chevron-right" class="right scale-125" />
          <div
            class="absolute flex h-full w-full items-center justify-center bg-background opacity-0"
          >
            <div class="mt-5 flex flex-wrap gap-2">
              <LinkButton
                v-for="item in actions?.body"
                :key="item.icon"
                :style="item.style"
                :icon="item.icon"
                :end-icon="item.endIcon"
                :href="item.link"
                :target="item.target"
                :variant="item.variant"
              >
                {{ item.text }}
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
/* 网格链接共享样式 */
.grid-link {
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
  cursor: pointer;

  // 右箭头图标动画
  .right {
    transition: all 0.3s ease-in-out;
  }

  &:hover .right {
    margin-left: 0.25em;
  }

  &.social-link {
    .absolute {
      transition: opacity 0.3s ease;
    }

    &:hover .absolute {
      opacity: 1;
    }
  }
}
</style>
