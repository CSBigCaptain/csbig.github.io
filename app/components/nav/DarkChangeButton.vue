<script setup lang="ts">
const { mduiDark, toggleDark } = useTheme()
</script>

<template>
  <mdui-button-icon
    aria-label="切换深浅模式"
    @click="
      () => {
        toggleDark[0]!()
      }
    "
  >
    <client-only>
      <Icon v-if="mduiDark" name="ic:round-nightlight" />
      <Icon v-else name="ic:round-wb-sunny" />
    </client-only>
  </mdui-button-icon>
</template>

<style lang="less" scoped>
mdui-menu {
  width: 130px;
  height: auto;
  background-color: rgb(var(--mdui-color-surface-variant));
  color: rgb(var(--mdui-color-on-surface-variant));
  border-radius: 0.75rem;
}
</style>
