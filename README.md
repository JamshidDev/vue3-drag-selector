# Vue3 Drag Selector

A **Vue 3** component for drag-to-select functionality with **auto-scroll** support. Perfect for selecting multiple items in a scrollable container.

[Demo](https://vue3-drag-selector.netlify.app) | [GitHub](https://github.com/JamshidDev/vue3-drag-selector)

---

## Features

* Drag to select multiple items
* Auto-scroll when dragging near container edges
* Live selection updates
* Customizable selection box and scroll behavior
* Works with Vue 3

---

## Installation

```bash
npm install vue3-drag-selector
```

Or using yarn:

```bash
yarn add vue3-drag-selector
```

---

## Usage

### Global Registration

```js
import { createApp } from 'vue'
import App from './App.vue'
import Vue3DragSelector from 'vue3-drag-selector'

const app = createApp(App)
app.use(Vue3DragSelector)
app.mount('#app')
```

### Local Registration

```js
import { DragSelector } from 'vue3-drag-selector'

export default {
  components: {
    DragSelector
  }
}
```

---

## Basic Example

```vue
<template>
  <DragSelector
    :threshold="0.5"
    :liveSelection="true"
    selectionColor="rgba(59, 130, 246, 0.25)"
    borderColor="rgba(59, 130, 246, 0.8)"
  >
    <div v-for="item in items" :key="item.id" :data-selectable="item.id" class="item">
      {{ item.name }}
    </div>
  </DragSelector>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
])
</script>

<style>
.item {
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
}
</style>
```

---

## Props

| Prop               | Type    | Default                      | Description                                            |
| ------------------ | ------- | ---------------------------- | ------------------------------------------------------ |
| `threshold`        | Number  | `null`                       | Percentage of overlap required to select an item (0–1) |
| `liveSelection`    | Boolean | `true`                       | Update selection in real-time while dragging           |
| `selectionColor`   | String  | `'rgba(59, 130, 246, 0.25)'` | Background color of selection box                      |
| `borderColor`      | String  | `'rgba(59, 130, 246, 0.8)'`  | Border color of selection box                          |
| `scrollZone`       | Number  | `60`                         | Distance in px from edge to start auto-scroll          |
| `minScrollSpeed`   | Number  | `3`                          | Minimum scroll speed                                   |
| `maxScrollSpeed`   | Number  | `15`                         | Maximum scroll speed                                   |
| `scrollZoneRight`  | Number  | `null`                       | Custom right scroll zone                               |
| `scrollZoneLeft`   | Number  | `null`                       | Custom left scroll zone                                |
| `scrollZoneTop`    | Number  | `null`                       | Custom top scroll zone                                 |
| `scrollZoneBottom` | Number  | `null`                       | Custom bottom scroll zone                              |

---

## Events

| Event              | Payload     | Description                            |
| ------------------ | ----------- | -------------------------------------- |
| `selection-start`  | `undefined` | Triggered when selection starts        |
| `selection-change` | `Array`     | Array of selected items `{...dataset}` |
| `selection-end`    | `undefined` | Triggered when selection ends          |

---

## Methods (via `ref` / `defineExpose`)

```js
const selector = ref(null)
```

* `selector.value.isSelected(id)` – Check if an item is selected
* `selector.value.clearSelection()` – Clear all selections
* `selector.value.selectedItems` – Set of currently selected items

---

## License

MIT © Jamacoder
