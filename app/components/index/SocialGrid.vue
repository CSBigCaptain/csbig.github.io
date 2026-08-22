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
  <div class="h-60 w-full border-y-2 border-outline-variant md:h-40">
    <div class="social-grid flex h-full text-sm font-semibold sm:text-lg md:text-2xl">
      <NuxtLink
        to="/blog"
        class="grid-link justify-end hover:bg-surface-variant hover:text-on-surface-variant"
      >
        <div class="actions-inner">
          Read Articles
          <Icon name="ic:baseline-chevron-right" class="right scale-125" />
        </div>
      </NuxtLink>
      <div class="grid-link justify-start">
        <div class="actions-inner">
          <div class="flex flex-wrap gap-2">
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
</template>

<style lang="less" scoped>
.social-grid {
  flex-direction: column;

  > :not(:last-child) {
    border-bottom-width: 2px;
    border-color: rgb(var(--mdui-color-outline-variant));
  }

  @media (min-width: 48rem) {
    flex-direction: row;

    > :not(:last-child) {
      border-bottom-width: 0;
      border-inline-end-width: 2px;
    }
  }
}

/* 网格链接共享样式 */
.grid-link {
  flex: 1;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
  font-weight: var(--font-semibold);

  // 右箭头图标动画
  .right {
    transition: all 0.3s ease-in-out;
  }

  &:hover .right {
    margin-left: 0.25em;
  }

  .actions-inner {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    max-width: 48rem;
  }
}
</style>
