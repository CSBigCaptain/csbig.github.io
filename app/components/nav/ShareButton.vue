<script lang="ts" setup>
function share() {
  const { share } = useShare()
  share({
    title: document.title,
    text: '嘿伙计👋，给你分享个好东西！',
    url: location.href,
  })
}
</script>

<template>
  <mdui-button-icon aria-label="分享" @click="share">
    <Icon name="ic:round-share" />
  </mdui-button-icon>
</template>

<style lang="less"></style>
