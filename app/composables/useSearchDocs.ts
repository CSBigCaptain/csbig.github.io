import { useFuse } from '@vueuse/integrations/useFuse'

/**
 * 博客全文搜索：拉取搜索索引（按小节切分），并用 Fuse.js 做模糊匹配。
 * 返回的 query / results / status 均为响应式引用，可直接解构使用。
 */
export function useSearchDocs() {
  const query = ref('')

  const { data, status } = useAsyncData(
    'search-data',
    () =>
      queryCollectionSearchSections('blog' as never, {
        ignoredTags: ['header', 'footer', 'pre', 'code', 'style', 'script'],
      }),
    {
      server: true,
      lazy: false,
      getCachedData: key => useNuxtApp().payload.data[key] || useNuxtApp().static.data[key],
    },
  )

  const { results } = useFuse(
    query,
    computed(() => data.value ?? []),
    {
      fuseOptions: {
        keys: ['title', 'content', 'titles'],
        threshold: 0.4,
        includeScore: true,
        includeMatches: true,
        ignoreLocation: true,
      },
      resultLimit: 20,
    },
  )

  return {
    query,
    results,
    status,
  }
}
