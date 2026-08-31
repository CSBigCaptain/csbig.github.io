<template>
  <ol class="my-4 ps-4 leading-normal">
    <slot />
  </ol>
</template>

<style lang="less">
ol > li[content] {
  list-style: decimal;

  & > ol > li[content] {
    list-style: lower-greek;

    & > ol > li[content] {
      list-style: lower-latin;

      & > ol > li[content] {
        list-style: upper-roman;

        & > ol > li[content] {
          list-style: decimal-leading-zero;

          & > ol > li[content] {
            list-style: trad-chinese-formal;
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

ol li[content]::marker {
  color: var(--color-outline);
}
</style>
