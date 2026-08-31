<script lang="ts" setup>
import 'mdui/components/button'

export interface TocLink {
  id: string
  text?: string
  children?: TocLink[]
}

const props = defineProps<{ post?: { body?: { toc?: { links?: TocLink[] } } } }>()

const { activeHeadings, updateHeadings } = useScrollspy()

const nuxtApp = useNuxtApp()

const headingSelector = '.prose-h4-container, .prose-h3, .prose-h2-container'

nuxtApp.hooks.hook('page:loading:end', () => {
  updateHeadings(Array.from(document.querySelectorAll(headingSelector)))
})
nuxtApp.hooks.hook('page:transition:finish', () => {
  updateHeadings(Array.from(document.querySelectorAll(headingSelector)))
})

function flattenLinks(links: TocLink[]): TocLink[] {
  return links.flatMap(link => [link, ...(link.children ? flattenLinks(link.children) : [])])
}

const flatLinks = computed(() => flattenLinks(props.post?.body?.toc?.links ?? []))

const linkHeight = 26

const indicatorStyle = computed(() => {
  if (!activeHeadings.value?.length) {
    return
  }

  const activeIndex = flatLinks.value.findIndex(link => activeHeadings.value.includes(link.id))

  return {
    height: `${linkHeight * activeHeadings.value.length}px`,
    top: `${activeIndex * linkHeight}px`,
  }
})

const contentRef = useTemplateRef<HTMLElement>('contentRef')

// 当活动链接变化时，保持其在列表中居中。
// 直接滚动容器而不是使用 `scrollIntoView`，这样只有列表移动，页面不会滚动。
watch(
  () => flatLinks.value.findIndex(link => activeHeadings.value.includes(link.id)),
  (index) => {
    const container = contentRef.value
    if (index < 0 || !container) {
      return
    }

    nextTick(() => {
      const link = container.querySelectorAll<HTMLElement>('a.link')[index]
      if (!link) {
        return
      }

      const containerRect = container.getBoundingClientRect()
      const linkRect = link.getBoundingClientRect()
      const linkOffset = linkRect.top - containerRect.top + container.scrollTop

      container.scrollTo({
        top: linkOffset - container.clientHeight / 2 + linkRect.height / 2,
        behavior: 'smooth',
      })
    })
  },
)

const { style: scrollShadowStyle } = useScrollShadow(contentRef)
</script>

<template>
  <div class="contents" variant="filled">
    <mdui-button class="topic-btn" variant="tonal">
      <Icon slot="icon" name="ic:outline-article" />
      On this page
    </mdui-button>
    <div
      ref="contentRef"
      class="content max-h-[60vh] overflow-y-auto overscroll-contain pl-4"
      :style="scrollShadowStyle"
    >
      <div class="indicator relative bg-surface-container-highest">
        <div class="absolute left-0 w-full bg-primary duration-200" :style="indicatorStyle" />
      </div>
      <ul class="md:text-md pl-3 text-sm lg:pl-4">
        <li v-for="item in props.post?.body?.toc?.links" :key="item.id">
          <NuxtLink
            :to="`#${item.id}`"
            class="link"
            :class="{ active: activeHeadings.includes(item.id) }"
          >
            {{ item.text }}
          </NuxtLink>
          <ul v-if="item.children?.length">
            <li v-for="child in item.children" :key="child.id">
              <NuxtLink
                :to="`#${child.id}`"
                class="link"
                :class="{ active: activeHeadings.includes(child.id) }"
              >
                {{ child.text }}
              </NuxtLink>
              <ul v-if="child.children?.length">
                <li v-for="grand in child.children" :key="grand.id">
                  <NuxtLink
                    :to="`#${grand.id}`"
                    class="link"
                    :class="{ active: activeHeadings.includes(grand.id) }"
                  >
                    {{ grand.text }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.topic-btn::part(button) {
  justify-content: flex-start;
}

.content {
  display: grid;
  grid-template-columns: 2px minmax(0, 1fr);
  align-items: stretch;
}

ul {
  & ul {
    padding-left: 1em;
  }
  & .link {
    display: block;
    height: 26px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(var(--mdui-color-on-surface), 0.7);
  }
  & .active {
    color: rgba(var(--mdui-color-primary), 0.7);
  }
  & .link:hover {
    font-weight: var(--bold-font-weight);
    color: rgba(var(--mdui-color-secondary), 1);
  }
}
</style>
