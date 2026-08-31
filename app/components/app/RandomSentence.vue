<script lang="ts" setup>
import Typed from 'typed.js'

// 获取随机句子
const { data } = await useAsyncData(
  'random-sentence',
  async () => {
    const res = await $fetch<any>('https://hub.saintic.com/openservice/sentence/')
    return {
      sentence: res?.data?.sentence || '',
      author: res?.data?.author || '',
      name: res?.data?.name || '',
    }
  },
  {
    default: () => ({
      sentence: `If you don't change your direction, and if you keep looking, you may end up where you are heading.`,
      author: 'Anonymous',
      name: '',
    }),
    server: false,
  },
)

let typed: Typed | null = null
onMounted(() => {
  typed = new Typed('#element', {
    strings: [data.value.sentence],
    typeSpeed: 30,
    showCursor: false,
  })
})

onUnmounted(() => {
  typed?.destroy()
  typed = null
})
</script>

<template>
  <div
    class="OuterMain flex h-[45vh] w-full items-center justify-center bg-surface-container-highest"
  >
    <div class="inner flex w-[70%] max-w-540 min-w-92.5 flex-col items-center p-3.75">
      <div id="element" class="mb-4 min-h-8 cursor-pointer text-center text-2xl font-bold" />
      <div class="source text-md text-center opacity-70">
        {{ data.author }}
        {{ data.sentence?.name ? `（${data.sentence.name}）` : '' }}
      </div>
    </div>
  </div>
</template>
