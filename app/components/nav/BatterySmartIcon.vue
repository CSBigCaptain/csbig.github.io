<script setup lang="ts">
const { isSupported, level, charging } = useBattery()
</script>

<template>
  <mdui-button-icon aria-label="电池信息">
    <Icon v-if="isSupported && charging" name="ic:round-battery-charging-full" />
    <Icon v-else-if="isSupported && level <= 0.1" name="ic:round-battery-0-bar" />
    <Icon v-else-if="isSupported && level <= 0.2" name="ic:round-battery-1-bar" />
    <Icon v-else-if="isSupported && level <= 0.35" name="ic:round-battery-2-bar" />
    <Icon v-else-if="isSupported && level <= 0.5" name="ic:round-battery-3-bar" />
    <Icon v-else-if="isSupported && level <= 0.65" name="ic:round-battery-4-bar" />
    <Icon v-else-if="isSupported && level <= 0.75" name="ic:round-battery-5-bar" />
    <Icon v-else-if="isSupported && level <= 0.9" name="ic:round-battery-6-bar" />
    <Icon v-else-if="isSupported && level <= 1" name="ic:round-battery-full" />
    <Icon v-else-if="!isSupported" name="ic:round-battery-unknown" />
    <Icon v-else name="ic:round-battery-alert" />
  </mdui-button-icon>
</template>
