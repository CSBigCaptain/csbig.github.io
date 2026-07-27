import tailwindcss from '@tailwindcss/vite'
import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'
import { defineNuxtConfig } from 'nuxt/config'
import { person } from './shared/utils/person'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    '@nuxtjs/seo',
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/eslint',
    '@nuxt/hints',
  ],
  devtools: { enabled: true },
  app: {
    baseURL: '/',
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://rsms.me/inter/inter.css',
          media: 'print',
          onload: 'this.media="all"',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn-font.hyperos.mi.com/font/css?family=MiSans:100,200,300,400,450,500,600,650,700,900:Chinese_Simplify,Latin&display=swap',
          media: 'print',
          onload: 'this.media="all"',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.cn/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&display=swap',
        },
      ],
      script: [
        {
          // Umami 统计脚本
          'defer': true,
          'src': 'https://stats.kungal.org/script.js',
          'data-website-id': '3822f94c-9a02-4e86-9a8f-906edb1e0e2c',
          'data-domains': 'csbig.top, www.csbig.top, blog.csbig.top, csbigcaptain.github.io',
        },
        {
          innerHTML: /* js */ `
            // 解决首屏加载闪白问题
            const localPreference = localStorage.getItem('vueuse-color-scheme');
            const systemPreferenceDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (localPreference === 'dark') {
              document.documentElement.classList.toggle('mdui-theme-dark');
            } if (localPreference === 'light') {
              document.documentElement.classList.remove('mdui-theme-dark');
            } else if (systemPreferenceDark) {
              document.documentElement.classList.toggle('mdui-theme-dark', localPreference !== 'light');
            }
          `,
        },
      ],
      noscript: [{ innerHTML: 'JavaScript is required' }],
    },
  },
  css: ['~/assets/css/global.css'],
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.startsWith('mdui-'),
    },
  },
  site: {
    // 站点 URL，不写是因为开发环境下会自动设置
    // 在环境变量中配置 NUXT_SITE_URL
    name: '', // 站点名称，在环境变量中配置 NUXT_SITE_NAME
    description:
      'CSBigCaptain 的个人博客，分享技术与生活。这个博客记录了他在生活和技术学习中的点滴经历，充满启发与思考。网站界面简洁美观，内容丰富实用，人气互动活跃，涵盖了编程、生活、学习等多个领域，为读者提供了卓越的阅读体验。',
    locale: 'zh-CN',
  },
  content: {
    build: {
      markdown: {
        remarkPlugins: {
          'remark-emoji': {
            emoticon: true,
          },
          'remark-math': {
            inlineMathDouble: true,
            singleDollor: true,
          },
        },
        rehypePlugins: {
          'rehype-katex': {
            output: 'html',
            trust: true,
          },
        },
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
          },
          // @keep-sorted
          langs: ['c', 'cpp', 'css', 'html', 'js', 'json', 'ps', 'python', 'ts', 'vue', 'yaml'],
        },
        toc: {
          depth: 3,
          searchDepth: 3,
        },
      },
    },
    experimental: { sqliteConnector: 'native' },
  },
  experimental: {
    typescriptPlugin: true,
    componentIslands: true,
  },
  compatibilityDate: '2025-03-08',
  nitro: {
    prerender: {
      failOnError: true,
      crawlLinks: true,
      // 修复部分平台会在文章路径添加 '/'，导致闪现 404 错误
      // https://github.com/nuxt/content/issues/2378
      // autoSubfolderIndex: process.env.CLOUDFLARE_PAGES || process.env.GITHUB_ACTIONS || process.env.NETLIFY ? false : undefined,
    },
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
    css: {
      transformer: 'lightningcss',
      lightningcss: {
        targets: browserslistToTargets(browserslist('>= 0.25%')),
      },
    },
    optimizeDeps: {
      // @keep-sorted
      include: [
        '@nuxt/hints',
        '@unhead/schema-org/vue',
        '@vueuse/integrations',
        '@vueuse/integrations/useFuse',
        'mdui/components/button-icon',
        'mdui/components/button',
        'mdui/components/card',
        'mdui/components/dialog',
        'mdui/components/dropdown',
        'mdui/components/layout-main',
        'mdui/components/layout',
        'mdui/components/list-item',
        'mdui/components/list',
        'mdui/components/navigation-drawer',
        'mdui/components/switch',
        'mdui/components/text-field',
        'mdui/components/tooltip',
        'mdui/components/top-app-bar-title',
        'mdui/components/top-app-bar',
        'mdui/functions/setColorScheme',
        'mdui/functions/setTheme',
        'tslib/tslib.js',
        'typed.js',
      ],
    },
    plugins: [tailwindcss() as any],
    resolve: {
      // TODO: @vueuse/motion 依赖 tslib，构建时打包进服务端 bundle，结果 tslib 的 ESM/CJS 互操作出了问题，默认导出是 undefined
      // 修复 SSR 预渲染崩溃：tslib 在 ESM/CJS 互操作中默认导出为 undefined。
      alias: { tslib: 'tslib/tslib.js' },
    },
    ssr: {
      // 让 tslib 保持在 SSR bundle 内，避免预渲染的 ESM 互操作问题。
      noExternal: ['tslib'],
    },
  },
  typescript: {
    typeCheck: false,
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  ogImage: false,
  robots: {
    // sitemap 模块依赖于 robots 模块
    enabled: true,
  },
  schemaOrg: {
    identity: person,
  },
  seo: {
    mergeWithSiteConfig: false,
    automaticDefaults: false,
  },
  sitemap: {
    zeroRuntime: true,
  },
})
