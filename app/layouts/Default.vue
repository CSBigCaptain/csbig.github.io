<script setup lang="ts">
import 'mdui/components/navigation-drawer'
import 'mdui/components/layout'
import 'mdui/components/layout-main'

const { drawerStatus, searchStatus, closeAll } = useLayoutStatus()
</script>

<template>
  <div>
    <DefaultNav>
      <template #topic-text>
        <slot name="topic-text" />
      </template>
    </DefaultNav>
    <mdui-layout>
      <mdui-layout-main>
        <slot name="full-width" />
        <AppContainer>
          <template #left>
            <slot name="left" />
          </template>
          <slot />
          <template #right>
            <slot name="right" />
          </template>
        </AppContainer>
        <FooterDefault />
      </mdui-layout-main>
    </mdui-layout>
    <ClientOnly>
      <mdui-navigation-drawer
        modal
        close-on-overlay-click
        close-on-esc
        :open="drawerStatus"
        @close="drawerStatus = false"
      >
        <aside>
          <NavigationDrawerList />
        </aside>
      </mdui-navigation-drawer>
      <AppSearch :open="searchStatus" @close="closeAll()" />
    </ClientOnly>
  </div>
</template>

<style lang="less" scoped>
mdui-layout {
  scroll-behavior: smooth;
  min-width: 320px;
}
// top-app-bar 的 z-index 值为100
// navigation-drawer 的 z-index 值为99

mdui-navigation-drawer {
  --shape-corner: 0px;
  z-index: 99;
  transform: translateY(64px);
}
</style>
