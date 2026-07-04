<script lang="ts" setup>
import 'mdui/components/card'

const ROWS = 12
const REPEAT = 20
const pattern = 'CSBIG'
const CIRCLE_RADIUS = 220
const HALF_POINTS = 49 // 每半圆 49 个点 (0~48)
const TRAIL_COUNT = 6

const DARK_ROWS = 20
const DARK_REPEAT = 30

const containerRef = ref<HTMLElement>()
const revealRef = ref<HTMLElement>()

// 尾迹点链条 + 动画状态
const state = {
  targetX: -300,
  targetY: -300,
  trail: Array.from({ length: TRAIL_COUNT }, () => ({ x: -300, y: -300 })),
  isInside: false,
  rafId: 0,
}

function tick() {
  const s = state
  // 每个尾迹点跟随前一个点，lerp 因子递减
  for (let t = 0; t < TRAIL_COUNT; t++) {
    const srcX = t === 0 ? s.targetX : s.trail[t - 1].x
    const srcY = t === 0 ? s.targetY : s.trail[t - 1].y
    const ease = 0.7 - 0.04 * t
    s.trail[t].x += (srcX - s.trail[t].x) * ease
    s.trail[t].y += (srcY - s.trail[t].y) * ease
  }

  const front = s.trail[0]
  const back = s.trail[TRAIL_COUNT - 1]

  // 两圆心连线方向
  const angle = Math.atan2(front.y - back.y, front.x - back.x)
  const r = CIRCLE_RADIUS
  const pts: string[] = []

  // 前半圆弧（运动方向侧），圆心 = trail[0]
  for (let i = 0; i <= HALF_POINTS; i++) {
    const theta = angle - Math.PI / 2 + (Math.PI * i) / HALF_POINTS
    pts.push(
      `${(front.x + r * Math.cos(theta)).toFixed(1)}px ${(front.y + r * Math.sin(theta)).toFixed(1)}px`,
    )
  }

  // 后半圆弧，圆心 = trail[5]
  for (let i = 0; i <= HALF_POINTS; i++) {
    const theta = angle + Math.PI / 2 + (Math.PI * i) / HALF_POINTS
    pts.push(
      `${(back.x + r * Math.cos(theta)).toFixed(1)}px ${(back.y + r * Math.sin(theta)).toFixed(1)}px`,
    )
  }

  if (revealRef.value) {
    revealRef.value.style.clipPath = `polygon(${pts.join(', ')})`
  }

  // 条件停止：尾迹末端足够接近目标且鼠标不在容器内时停止动画
  const tail = s.trail[TRAIL_COUNT - 1]
  if (Math.abs(s.targetX - tail.x) > 1 || Math.abs(s.targetY - tail.y) > 1 || s.isInside) {
    s.rafId = requestAnimationFrame(tick)
  }
  else {
    s.rafId = 0
  }
}

function onMouseMove(e: MouseEvent) {
  const rect = containerRef.value?.getBoundingClientRect()
  if (!rect)
    return
  state.targetX = e.clientX - rect.left
  state.targetY = e.clientY - rect.top
  if (!state.rafId)
    state.rafId = requestAnimationFrame(tick)
}

function onMouseEnter(e: MouseEvent) {
  const rect = containerRef.value?.getBoundingClientRect()
  if (!rect)
    return
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  state.isInside = true
  state.targetX = x
  state.targetY = y
  // 首次进入时所有尾迹点跳到鼠标位置
  for (let i = 0; i < TRAIL_COUNT; i++) {
    state.trail[i] = { x, y }
  }
  if (!state.rafId)
    state.rafId = requestAnimationFrame(tick)
}

function onMouseLeave(e: MouseEvent) {
  state.isInside = false
  const rect = containerRef.value?.getBoundingClientRect()
  if (!rect)
    return
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  // 目标飞出容器边缘，而不是跳到 -999
  state.targetX = x <= 0 ? -400 : x >= rect.width ? rect.width + 400 : x
  state.targetY = y <= 0 ? -400 : y >= rect.height ? rect.height + 400 : y
}

onUnmounted(() => {
  if (state.rafId)
    cancelAnimationFrame(state.rafId)
  state.isInside = false
})
</script>

<template>
  <div
    ref="containerRef"
    class="relative flex h-[calc(100dvh-224px)] flex-col items-center justify-center overflow-hidden bg-background"
    @mousemove="onMouseMove"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <!-- 原始层：浅色底纹 + 原始内容 -->
    <div class="pattern-mask absolute inset-0 z-0 overflow-hidden">
      <div v-for="row in ROWS" :key="row" class="pattern-row">
        <span v-for="n in REPEAT" :key="n" class="pattern-char pattern-char--light">{{
          pattern
        }}</span>
      </div>
    </div>
    <div class="relative z-1 text-5xl tracking-wider">
      Hi, I'm CSBigCaptain.
    </div>

    <!-- 揭示层：暗色底纹 + 暗色内容，跟随鼠标圆形裁剪 -->
    <div
      ref="revealRef"
      class="pointer-events-none absolute inset-0 z-2 bg-black"
      style="clip-path: circle(0px at -300px -300px)"
    >
      <div class="pattern-mask absolute inset-0 overflow-hidden">
        <div v-for="row in DARK_ROWS" :key="`dark-${row}`" class="pattern-row">
          <span v-for="n in DARK_REPEAT" :key="n" class="pattern-char pattern-char--dark">{{
            pattern
          }}</span>
        </div>
      </div>
      <div
        class="relative z-1 flex min-h-[70vh] items-center justify-center text-5xl tracking-wider text-white"
      >
        Welcome to my blog.
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
/* 背景花纹行：nth-child 偏移 */
.pattern-row {
  display: flex;
  white-space: nowrap;

  &:nth-child(4n + 1) {
    margin-left: 0;
  }
  &:nth-child(4n + 2) {
    margin-left: -8%;
  }
  &:nth-child(4n + 3) {
    margin-left: -20%;
  }
  &:nth-child(4n) {
    margin-left: -12%;
  }
}

/* 花纹文字基础样式 */
.pattern-char {
  flex-shrink: 0;
  font-weight: 700;
  user-select: none;
  pointer-events: none;
}

/* 花纹文字 - 浅色层 */
.pattern-char--light {
  font-size: 3rem;
  letter-spacing: 0.8em;
  line-height: 2;
  color: var(--color-outline-variant);
  opacity: 0.1;
}

/* 花纹文字 - 暗色层 */
.pattern-char--dark {
  font-size: 2.25rem;
  letter-spacing: 0.5em;
  line-height: 1.75;
  color: white;
  opacity: 0.15;
}

/* 中间透明遮罩：让中心文字更易阅读 */
.pattern-mask {
  -webkit-mask-image: radial-gradient(
    ellipse 45% 35% at center,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 25%,
    rgba(0, 0, 0, 1) 60%
  );
  mask-image: radial-gradient(
    ellipse 45% 35% at center,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 25%,
    rgba(0, 0, 0, 1) 60%
  );
}
</style>
