<script lang="ts" setup>
const { data: posts } = await useAsyncData('featuredPosts', () => {
  return queryCollection('blog').where('isFeatured', '=', true).order('date', 'DESC').all()
})
</script>

<template>
  <div>
    <div class="h-20 border-b border-outline-variant lg:h-30" />
    <div class="flex h-50 w-full items-center px-5 md:px-15">
      <h2 class="text-5xl font-normal">
        精选文章
      </h2>
    </div>
    <table class="w-full border-collapse">
      <tbody>
        <tr v-for="(post, index) in posts" :key="post.id" class="fav-row relative">
          <td
            class="w-1/8 border border-l-0 border-outline-variant px-5 py-3.5 text-right font-semibold text-on-surface group-hover:text-on-surface-variant"
          >
            {{ index + 1 }}
          </td>
          <td class="border border-r-0 border-outline-variant px-5 py-3.5">
            <NuxtLink
              :to="post.path"
              class="block w-full font-semibold text-on-surface no-underline transition-colors duration-300 group-hover:text-on-surface-variant after:absolute after:inset-0 after:content-['']"
            >
              {{ post.title }}
            </NuxtLink>
          </td>
        </tr>
        <tr class="fav-row group relative">
          <td
            class="w-1/8 border border-l-0 border-outline-variant px-5 py-3.5 text-right font-semibold text-on-surface group-hover:text-on-surface-variant"
          >
            ...
          </td>
          <td colspan="2" class="border border-x-0 border-outline-variant px-5 py-3.5 text-left">
            <NuxtLink
              to="/blog"
              class="block w-full font-semibold text-on-surface no-underline transition-colors duration-300 group-hover:text-on-surface-variant after:absolute after:inset-0 after:content-['']"
            >
              MORE
            </NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.fav-row {
  background-image: linear-gradient(
    to right,
    rgb(var(--mdui-color-surface-variant)),
    rgb(var(--mdui-color-surface-variant))
  );
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 0% 100%;
}

.fav-row:hover {
  animation: wipe-in 0.5s ease forwards;
}

@keyframes wipe-in {
  from {
    background-size: 0% 100%;
  }
  to {
    background-size: 100% 100%;
  }
}
</style>
