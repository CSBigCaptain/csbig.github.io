<script lang="ts" setup>
import 'mdui/components/button-icon'
import 'mdui/components/card'
import 'mdui/components/dialog'
import 'mdui/components/text-field'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const { query, results } = useSearchDocs()
</script>

<template>
  <mdui-dialog
    class="search-dialog"
    :open="props.open"
    close-on-esc
    close-on-overlay-click
    @close="emit('close')"
  >
    <div class="flex min-h-0 flex-1 flex-col">
      <div class="flex items-stretch gap-2 pb-3">
        <mdui-text-field
          class="min-w-0 flex-1"
          variant="outlined"
          :value="query"
          placeholder="Search..."
          clearable
          @input="query = $event.target.value"
        >
          <Icon slot="icon" name="ic:round-search" />
        </mdui-text-field>
        <mdui-button-icon
          class="hidden aspect-square h-auto w-auto items-center justify-center self-stretch max-sm:inline-flex"
          @click="emit('close')"
        >
          <Icon name="ic:round-close" />
        </mdui-button-icon>
      </div>
      <div v-if="query" class="min-h-0 flex-1 overflow-y-auto max-sm:max-h-[calc(70dvh-7rem)]">
        <p v-if="!results.length" class="my-8 text-center opacity-60">
          没有找到相关内容
        </p>
        <ul v-else class="m-0 flex list-none flex-col gap-2 p-0">
          <li v-for="item in results" :key="item.item.id">
            <NuxtLink
              :to="item.item.id"
              class="text-inherit no-underline"
              @click="emit('close')"
            >
              <mdui-card
                variant="filled"
                clickable
                class="bg-transparent box-border block w-full px-(--inline-padding) py-3"
              >
                <div class="flex flex-col gap-0.5">
                  <div v-if="item.item.titles.length" class="text-xs opacity-60">
                    {{ item.item.titles.join(' › ') }}
                  </div>
                  <div
                    class="text-base font-semibold"
                    v-html="highlightMatch(item.item.title, item.matches, 'title')"
                  />
                </div>
                <div
                  v-if="item.item.content"
                  class="mt-1 line-clamp-3 break-all text-sm"
                  v-html="highlightMatch(item.item.content, item.matches, 'content')"
                />
              </mdui-card>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </mdui-dialog>
</template>

<style lang="less">
.search-dialog {
  --shape-corner: 16px;

  &::part(panel) {
    width: 720px;
    max-width: calc(100vw - 32px);
    height: 70vh;
    padding: 24px;
  }

  &::part(body) {
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  // 输入框圆角跟随 dialog 的 --shape-corner（该变量可继承进 shadow DOM）
  mdui-text-field::part(container) {
    padding-inline: 20px;
    border-radius: var(--shape-corner);
  }

  @media (max-width: 40rem) {
    padding: 16px;
    &::part(panel) {
      width: calc(100vw - 32px);
      height: auto;
      max-height: 70dvh;
    }

    &::part(body) {
      height: auto;
    }
  }
}

.highlight {
  padding: 0 2px;
  border-radius: 3px;
  color: rgb(var(--mdui-color-primary));
  background: rgba(var(--mdui-color-primary), 0.15);
  font-weight: bold;
}
</style>
