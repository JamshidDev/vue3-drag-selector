
<script setup>
import { ref, reactive, computed, onUnmounted } from 'vue'


const props = defineProps({
  threshold: {
    type: Number,
    default: null
  },
  liveSelection: {
    type: Boolean,
    default: true
  },
  selectionColor: {
    type: String,
    default: 'rgba(59, 130, 246, 0.25)'
  },
  borderColor: {
    type: String,
    default: 'rgba(59, 130, 246, 0.8)'
  },
  scrollZone: {
    type: Number,
    default: 60
  },
  minScrollSpeed: {
    type: Number,
    default: 3
  },
  maxScrollSpeed: {
    type: Number,
    default: 15
  },
  scrollZoneRight: {
    type: Number,
    default:null,
  },
  scrollZoneLeft: {
    type: Number,
    default:null,
  },
  scrollZoneTop: {
    type: Number,
    default:null,
  },
  scrollZoneBottom: {
    type: Number,
    default:null,
  },
  disable: {
    type: Boolean,
    default: false
  },
})

const emit = defineEmits([
  'selection-start',
  'selection-change',
  'selection-end',
])

const containerRef = ref(null)

const selection = reactive({
  isSelecting: false,
  startX: 0,
  startY: 0,
  currentX: 0,
  currentY: 0,
  clientX: 0,
  clientY: 0,
})

const autoScroll = reactive({
  animationId: null,
})




const selectedItems = ref(new Set())



const selectionBoxStyle = computed(() => {
  if (!selection.isSelecting) return { display: 'none' }

  const container = containerRef.value
  if (!container) return { display: 'none' }

  const maxX = container.scrollWidth
  const maxY = container.scrollHeight

  const clampedStartX = Math.max(0, Math.min(selection.startX, maxX))
  const clampedStartY = Math.max(0, Math.min(selection.startY, maxY))
  const clampedCurrentX = Math.max(0, Math.min(selection.currentX, maxX))
  const clampedCurrentY = Math.max(0, Math.min(selection.currentY, maxY))

  const left = Math.min(clampedStartX, clampedCurrentX)
  const top = Math.min(clampedStartY, clampedCurrentY)
  const width = Math.abs(clampedCurrentX - clampedStartX)
  const height = Math.abs(clampedCurrentY - clampedStartY)

  return {
    display: 'block',
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: props.selectionColor,
    border: `1px solid ${props.borderColor}`
  }
})

const getSelectionRect = () => {
  const container = containerRef.value
  if (!container) return { left: 0, top: 0, right: 0, bottom: 0 }

  const maxX = container.scrollWidth
  const maxY = container.scrollHeight

  const clampedStartX = Math.max(0, Math.min(selection.startX, maxX))
  const clampedStartY = Math.max(0, Math.min(selection.startY, maxY))
  const clampedCurrentX = Math.max(0, Math.min(selection.currentX, maxX))
  const clampedCurrentY = Math.max(0, Math.min(selection.currentY, maxY))

  return {
    left: Math.min(clampedStartX, clampedCurrentX),
    top: Math.min(clampedStartY, clampedCurrentY),
    right: Math.max(clampedStartX, clampedCurrentX),
    bottom: Math.max(clampedStartY, clampedCurrentY),
  }
}

const rectsIntersect = (rect1, rect2, thresholdVal = null) => {
  const noOverlap =
      rect1.right <= rect2.left ||
      rect1.left >= rect2.right ||
      rect1.bottom <= rect2.top ||
      rect1.top >= rect2.bottom

  if (noOverlap) return false

  if (thresholdVal === null) return true

  const overlapX = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left))
  const overlapY = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top))
  const overlapArea = overlapX * overlapY

  const rect2Area = (rect2.right - rect2.left) * (rect2.bottom - rect2.top)

  if (rect2Area === 0) return false

  return overlapArea / rect2Area >= thresholdVal
}

const updateSelectedItems = () => {
  if (!containerRef.value) return

  const containerRect = containerRef.value.getBoundingClientRect()
  const selectionRect = getSelectionRect()
  const newSelected = new Set()

  const itemElements = containerRef.value.querySelectorAll('[data-selectable]')

  itemElements.forEach((el) => {
    const itemRect = el.getBoundingClientRect()
    const relativeRect = {
      left: itemRect.left - containerRect.left + containerRef.value.scrollLeft,
      top: itemRect.top - containerRect.top + containerRef.value.scrollTop,
      right: itemRect.right - containerRect.left + containerRef.value.scrollLeft,
      bottom: itemRect.bottom - containerRect.top + containerRef.value.scrollTop,
    }

    if (rectsIntersect(selectionRect, relativeRect, props.threshold)) {
      const itemData = {...el.dataset}
      newSelected.add(JSON.stringify(itemData))
    }
  })


  emit('selection-change',[...newSelected].map(v=>JSON.parse(v)))
}


const calculateScrollSpeed = (distance) => {
  return props.minScrollSpeed + (distance / props.scrollZone) * (props.maxScrollSpeed - props.minScrollSpeed)
}

const performAutoScroll = () => {
  if (!selection.isSelecting || !containerRef.value) {
    stopAutoScroll()
    return
  }

  const container = containerRef.value
  const containerRect = container.getBoundingClientRect()


  const mouseX = selection.clientX
  const mouseY = selection.clientY
  const relativeX = mouseX - containerRect.left
  const relativeY = mouseY - containerRect.top


  // Scroll chegaralari
  const maxScrollLeft = container.scrollWidth - container.clientWidth
  const maxScrollTop = container.scrollHeight - container.clientHeight

// Scroll imkoniyatlari
  const canScrollLeft = container.scrollLeft > 0
  const canScrollRight = maxScrollLeft > 0 && container.scrollLeft < maxScrollLeft - 0.5
  const canScrollUp = container.scrollTop > 0
  const canScrollDown = maxScrollTop > 0 && container.scrollTop < maxScrollTop - 0.5

  let scrollSpeedX = 0
  let scrollSpeedY = 0
  let directionX = 0
  let directionY = 0


  let indicators = []

  const ZONE_RIGHT = props.scrollZoneRight ?? props.scrollZone
  const ZONE_LEFT = props.scrollZoneLeft ?? props.scrollZone
  const ZONE_TOP = props.scrollZoneTop ?? props.scrollZone
  const ZONE_BOTTOM = props.scrollZoneBottom ?? props.scrollZone


  if (relativeX < ZONE_LEFT && canScrollLeft) {
    const distance = ZONE_LEFT - relativeX
    scrollSpeedX = calculateScrollSpeed(distance)
    directionX = -1
    indicators.push('⬅️ Chapga')
  }

  else if (relativeX > containerRect.width - ZONE_RIGHT && canScrollRight) {
    const distance = relativeX - (containerRect.width - ZONE_RIGHT)
    scrollSpeedX = calculateScrollSpeed(distance)
    directionX = 1
    indicators.push('➡️ O\'ngga')
  }

  if (relativeY < ZONE_TOP && canScrollUp) {
    const distance = ZONE_TOP - relativeY
    scrollSpeedY = calculateScrollSpeed(distance)
    directionY = -1
    indicators.push('⬆️ Yuqoriga')
  }

  else if (relativeY > containerRect.height - ZONE_BOTTOM && canScrollDown) {
    const distance = relativeY - (containerRect.height - ZONE_BOTTOM)
    scrollSpeedY = calculateScrollSpeed(distance)
    directionY = 1
    indicators.push('⬇️ Pastga')
  }

  if (indicators.length > 0) {

  } else {

  }


  let hasScrolled = false

  if (scrollSpeedX > 0 && directionX !== 0) {
    const oldScrollLeft = container.scrollLeft

    let newScrollLeft = container.scrollLeft + directionX * scrollSpeedX
    newScrollLeft = Math.max(0, Math.min(newScrollLeft, maxScrollLeft))

    container.scrollLeft = newScrollLeft

    const scrollDeltaX = container.scrollLeft - oldScrollLeft

    if (Math.abs(scrollDeltaX) > 0.5) {
      selection.currentX += scrollDeltaX
      const contentWidth = container.scrollWidth
      selection.currentX = Math.max(0, Math.min(selection.currentX, contentWidth))
      hasScrolled = true
    }
  }

  if (scrollSpeedY > 0 && directionY !== 0) {
    const oldScrollTop = container.scrollTop

    let newScrollTop = container.scrollTop + directionY * scrollSpeedY
    newScrollTop = Math.max(0, Math.min(newScrollTop, maxScrollTop))

    container.scrollTop = newScrollTop

    const scrollDeltaY = container.scrollTop - oldScrollTop

    if (Math.abs(scrollDeltaY) > 0.5) {
      selection.currentY += scrollDeltaY
      const contentHeight = container.scrollHeight
      selection.currentY = Math.max(0, Math.min(selection.currentY, contentHeight))
      hasScrolled = true
    }
  }

  if (hasScrolled && props.liveSelection) {
    updateSelectedItems()
  }

  autoScroll.animationId = requestAnimationFrame(performAutoScroll)
}

const startAutoScroll = () => {
  if (!autoScroll.animationId) {
    autoScroll.animationId = requestAnimationFrame(performAutoScroll)
  }
}

const stopAutoScroll = () => {

  if (autoScroll.animationId) {
    cancelAnimationFrame(autoScroll.animationId)
    autoScroll.animationId = null
  }
}

const handleMouseDown = (e) => {

  if (props.disable || e.button !== 0) return

  if (e.target.closest('.no-selectable-item') && !e.shiftKey) {
    return
  }

  if (e.target === containerRef.value) {
    const el = containerRef.value
    const clickX = e.clientX - el.getBoundingClientRect().left
    const clickY = e.clientY - el.getBoundingClientRect().top

    if (clickX > el.clientWidth || clickY > el.clientHeight) {
      return
    }
  }

  const container = containerRef.value
  const containerRect = container.getBoundingClientRect()

  const startX = e.clientX - containerRect.left + container.scrollLeft
  const startY = e.clientY - containerRect.top + container.scrollTop

  selection.isSelecting = true
  selection.startX = startX
  selection.startY = startY
  selection.currentX = startX
  selection.currentY = startY
  selection.clientX = e.clientX
  selection.clientY = e.clientY

  if (!e.shiftKey) {
    selectedItems.value = new Set()
  }

  emit('selection-start')

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)

  startAutoScroll()
}

const onMouseMove = (e) => {
  if (!selection.isSelecting) return

  const container = containerRef.value
  const containerRect = container.getBoundingClientRect()

  selection.clientX = e.clientX
  selection.clientY = e.clientY

  let currentX = e.clientX - containerRect.left + container.scrollLeft
  let currentY = e.clientY - containerRect.top + container.scrollTop

  const containerWidth = container.scrollWidth
  const containerHeight = container.scrollHeight

  currentX = Math.max(0, Math.min(currentX, containerWidth))
  currentY = Math.max(0, Math.min(currentY, containerHeight))

  selection.currentX = currentX
  selection.currentY = currentY

  if (props.liveSelection) {
    updateSelectedItems()
  }
}

const onMouseUp = () => {
  selection.isSelecting = false
  stopAutoScroll()

  if (!props.liveSelection) {
    updateSelectedItems()
  }


  emit('selection-end')

  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
}


onUnmounted(() => {
  stopAutoScroll()
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
})

</script>

<template>
  <div
      ref="containerRef"
      @mousedown="handleMouseDown"
      class="drag-selector"
   >

    <div
        :style="selectionBoxStyle"
        class="drag-selector__box"
    />
    <slot></slot>

  </div>
</template>

<style scoped>
.drag-selector {
  position: relative;
  width: 100%;
  overflow:auto;
  cursor: pointer;
  box-sizing: border-box !important;
}

.drag-selector__box {
  position: absolute;
  pointer-events: none;
  z-index: 100;
  transition: none;
  box-sizing: border-box !important;
}
</style>