<template>
  <ul class="my-4 ps-4 leading-normal">
    <slot />
  </ul>
</template>

<style lang="less">
ul > li[content] {
  list-style: disc;

  & > ul > li[content] {
    list-style: circle;

    & > ul > li[content] {
      list-style: square;

      & > ul > li[content] {
        list-style: '*';

        & > ul > li[content] {
          list-style: lower-greek;

          & > ul > li[content] {
            list-style: lower-alpha;
          }
        }
      }
    }
  }
}

li[content] > ul,
li[content] > ol {
  margin-block: 0.25rem;
}

ul li[content]::marker {
  color: var(--color-outline);
}
</style>
