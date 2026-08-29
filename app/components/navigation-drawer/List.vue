<!-- eslint-disable -->
<script lang="ts" setup>
import 'mdui/components/list'
import 'mdui/components/list-item'

interface NavigationDrawerItem {
  text: string
  icon: string
  link: string
}

const list: NavigationDrawerItem[] = [
  { text: '首页', icon: '', link: '/' },
  { text: '博客列表', icon: '', link: '/blog/' },
  { text: '链接', icon: '', link: '/link/' },
]
</script>

<template>
  <mdui-list>
    <NuxtLink v-for="item in list" :key="item.text" :to="item.link">
      <mdui-list-item class="ps-1">
        {{ item.text }}
      </mdui-list-item>
    </NuxtLink>
  </mdui-list>
</template>
