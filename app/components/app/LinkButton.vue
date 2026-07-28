<script lang="ts" setup>
import type { ButtonIcon } from 'mdui/components/button-icon.js'
import type { Button } from 'mdui/components/button.js'
import 'mdui/components/button'

// @keep-sorted
interface CompatibleButtonProps {
  disabled?: boolean
  endIcon?: Button['endIcon']
  fullWidth?: Button['fullWidth']
  href?: string
  icon: string
  style?: 'large' | 'small'
  target?: string
  variant?: ButtonIcon['variant']
}

const props = defineProps<CompatibleButtonProps>()
</script>

<template>
  <NuxtLink v-if="props.href" :to="props.href" :target="props.target">
    <template v-if="props.style === 'small'">
      <mdui-button-icon :disabled="props.disabled" :variant="props.variant">
        <Icon :name="props.icon" />
      </mdui-button-icon>
    </template>
    <template v-else>
      <mdui-button :disabled="props.disabled" :variant="props.variant">
        <Icon slot="icon" :name="props.icon" />
        <Icon v-if="props.endIcon" slot="end-icon" :name="props.endIcon" />
        <slot />
      </mdui-button>
    </template>
  </NuxtLink>
</template>
