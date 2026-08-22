<script setup lang="ts">
import 'mdui/components/top-app-bar'
import 'mdui/components/top-app-bar-title'
import 'mdui/components/button-icon'

const { toggleDrawerStatus } = useLayoutStatus()
</script>

<template>
  <header class="fixed top-0 left-0 z-100 h-16">
    <mdui-top-app-bar class="px-2 py-3" variant="small">
      <mdui-button-icon
        name=""
        value=""
        type="button"
        variant="standard"
        aria-label="导航菜单开关"
        @click="toggleDrawerStatus()"
      >
        <Icon name="ic:round-menu" />
      </mdui-button-icon>
      <mdui-top-app-bar-title class="grow px-1 opacity-0 sm:opacity-100">
        <!-- 插槽 topic-text : 顶部导航显示的标题 -->
        <slot name="topic-text" />
      </mdui-top-app-bar-title>
      <div class="rt-btn-hub">
        <ClientOnly>
          <NavSearchButton />
          <NavChangeWebColor />
          <NavDarkChangeButton />
          <NavBatteryHelper />
          <NavShareButton />
          <NavMoreButton />
        </ClientOnly>
      </div>
    </mdui-top-app-bar>
  </header>
</template>
