import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { defineSitemapSchema } from '@nuxtjs/sitemap/content'
import { defineSchemaOrgSchema } from 'nuxt-schema-org/content'

export default defineContentConfig({
  // @keep-sorted
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        date: z.coerce.date(),
        update: z.coerce.date(),
        description: z.string(),
        isFeatured: z.boolean(),

        sitemap: defineSitemapSchema(),
        schemaOrg: defineSchemaOrgSchema(),
      }),
    }),
    indexActions: defineCollection({
      type: 'data',
      source: 'data/index/actions.yml',
      schema: z.object({
        body: z.array(
          z.object({
            style: z.enum(['large', 'small']),
            text: z.string().optional(),
            link: z.string(),
            variant: z.enum(['standard', 'filled', 'tonal', 'outlined']),
            icon: z.string(),
            endIcon: z.string().optional(),
            target: z.enum(['_blank', '_self']),
          }),
        ),
      }),
    }),
    indexAdvs: defineCollection({
      type: 'data',
      source: 'data/index/advs.yml',
      schema: z.object({
        body: z.array(
          z.object({
            title: z.string(),
            detail: z.string(),
          }),
        ),
      }),
    }),
    linkPageFriends: defineCollection({
      // @keep-sorted
      schema: z.object({
        links: z.array(
          z.object({
            author: z.string(),
            nick: z.string(),
            title: z.string(),
            desc: z.string(),
            link: z.string(),
            feed: z.string(),
            icon: z.string(),
            comment: z.string(),
            date: z.string(),
          }),
        ),
      }),
      source: 'data/links/friends.yml',
      type: 'data',
    }),
    linkPageTools: defineCollection({
      type: 'data',
      source: 'data/links/tools.yml',
      schema: z.object({
        links: z.array(
          z.object({
            date: z.string(),
            desc: z.string(),
            icon: z.string(),
            link: z.string(),
            nick: z.string(),
            title: z.string(),
          }),
        ),
      }),
    }),
    navigationDrawerList: defineCollection({
      type: 'data',
      source: 'data/navigation-drawer/list.yml',
      schema: z.object({
        body: z.array(
          z.object({
            text: z.string(),
            icon: z.string(),
            link: z.string(),
          }),
        ),
      }),
    }),
  },
})
