<script setup lang="ts">
// 定义组件属性
const props = defineProps<{
  code: string
  language?: string
  filename?: string
}>()

const copied = ref(false)

// 复制代码功能
async function copyCode() {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div
    class="code-wrapper -mx-5 my-4 overflow-hidden rounded-none bg-surface-container-highest shadow-l1 md:mx-0 md:rounded-md"
    v-bind="$attrs"
  >
    <!-- 代码块头部 -->
    <div class="code-header flex justify-between bg-secondary-container px-5 py-2">
      <div class="flex items-center text-xl text-on-secondary-container">
        <div class="w-20">
          {{ props.language }}
        </div>
      </div>
      <div class="actions h-10">
        <Transition name="fade" mode="out-in">
          <mdui-button-icon class="copy-btn" @click="copyCode">
            <Icon v-if="!copied" key="copy" name="ic:baseline-content-copy" />
            <Icon v-else key="done" name="ic:baseline-done" />
          </mdui-button-icon>
        </Transition>
      </div>
    </div>

    <!-- 代码内容区 -->
    <div class="flex">
      <pre
        :class="`language-${props.language}`"
        class="shiki m-0 h-auto w-full flex-1 overflow-x-auto px-5 py-4 text-sm/normal"
      ><code><slot /></code></pre>
    </div>
  </div>
</template>

<style scoped lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style>
/* 在 blockquote 中的代码块用负 margin 撑满 */
blockquote .code-wrapper {
  margin-inline: calc(-5 * var(--spacing));
  border-radius: 0;
}
</style>
