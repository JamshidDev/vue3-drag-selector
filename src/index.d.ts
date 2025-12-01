import type { DefineComponent } from 'vue'

/**
 * Selected item from drag selection
 * @example { id: '1', name: 'Item 1' }
 */
export interface SelectedItem {
    /** Unique identifier of selected item */
    id: string
    /** Additional data attributes */
    [key: string]: string
}

/**
 * DragSelector component props
 */
export interface DragSelectorProps {
    /**
     * Overlap percentage required to select an item.
     * Set to `null` for touch-to-select behavior.
     *
     * @default null
     * @example
     * ```vue
     * <!-- 50% overlap required -->
     * <DragSelector :threshold="0.5" />
     *
     * <!-- Touch to select (default) -->
     * <DragSelector :threshold="null" />
     * ```
     */
    threshold?: number | null

    /**
     * Update selection in real-time while dragging.
     * Set to `false` for better performance with large lists.
     *
     * @default true
     * @example
     * ```vue
     * <!-- Update only on drag end (better performance) -->
     * <DragSelector :live-selection="false" />
     * ```
     */
    liveSelection?: boolean

    /**
     * Background color of the selection box.
     * Accepts any valid CSS color value.
     *
     * @default 'rgba(59, 130, 246, 0.25)'
     * @example
     * ```vue
     * <DragSelector selection-color="rgba(255, 0, 0, 0.3)" />
     * ```
     */
    selectionColor?: string

    /**
     * Border color of the selection box.
     * Accepts any valid CSS color value.
     *
     * @default 'rgba(59, 130, 246, 0.8)'
     * @example
     * ```vue
     * <DragSelector border-color="#ff0000" />
     * ```
     */
    borderColor?: string

    /**
     * Distance in pixels from container edge to trigger auto-scroll.
     *
     * @default 60
     * @example
     * ```vue
     * <DragSelector :scroll-zone="100" />
     * ```
     */
    scrollZone?: number

    /**
     * Minimum auto-scroll speed in pixels per frame.
     *
     * @default 3
     */
    minScrollSpeed?: number

    /**
     * Maximum auto-scroll speed in pixels per frame.
     *
     * @default 15
     */
    maxScrollSpeed?: number

    /**
     * Custom scroll zone for right edge (px).
     * Overrides `scrollZone` for right side only.
     *
     * @default null (uses scrollZone)
     */
    scrollZoneRight?: number | null

    /**
     * Custom scroll zone for left edge (px).
     * Overrides `scrollZone` for left side only.
     *
     * @default null (uses scrollZone)
     */
    scrollZoneLeft?: number | null

    /**
     * Custom scroll zone for top edge (px).
     * Overrides `scrollZone` for top side only.
     *
     * @default null (uses scrollZone)
     */
    scrollZoneTop?: number | null

    /**
     * Custom scroll zone for bottom edge (px).
     * Overrides `scrollZone` for bottom side only.
     *
     * @default null (uses scrollZone)
     */
    scrollZoneBottom?: number | null

    /**
     * Callback fired when drag selection starts.
     *
     * @example
     * ```vue
     * <DragSelector @selection-start="onStart" />
     * ```
     */
    onSelectionStart?: () => void

    /**
     * Callback fired when selection changes during drag.
     * Receives array of selected items with their dataset attributes.
     *
     * @param items - Array of selected items
     * @example
     * ```vue
     * <DragSelector @selection-change="onSelect" />
     *
     * <script setup>
     * const onSelect = (items) => {
     *   // items = [{ id: '1' }, { id: '2', name: 'test' }]
     *   console.log(items)
     * }
     * </script>
     * ```
     */
    onSelectionChange?: (items: SelectedItem[]) => void

    /**
     * Callback fired when drag selection ends.
     *
     * @example
     * ```vue
     * <DragSelector @selection-end="onEnd" />
     * ```
     */
    onSelectionEnd?: () => void
}

/**
 * Exposed methods accessible via template ref
 */
export interface DragSelectorExposed {
    /**
     * Check if an item is currently selected
     * @param id - Item ID to check
     * @returns `true` if selected, `false` otherwise
     * @example
     * ```ts
     * selectorRef.value.isSelected('1') // true or false
     * ```
     */
    isSelected: (id: string | number) => boolean

    /**
     * Clear all current selections
     * @example
     * ```ts
     * selectorRef.value.clearSelection()
     * ```
     */
    clearSelection: () => void

    /**
     * Set of currently selected item IDs
     */
    selectedItems: Set<string>
}

/**
 * Vue 3 Drag Selector Component
 *
 * A component for drag-to-select functionality with auto-scroll support.
 *
 * @example
 * ```vue
 * <template>
 *   <DragSelector @selection-change="onSelect" class="container">
 *     <div
 *       v-for="item in items"
 *       :key="item.id"
 *       data-selectable
 *       :data-id="item.id"
 *     >
 *       {{ item.name }}
 *     </div>
 *   </DragSelector>
 * </template>
 *
 * <script setup>
 * import { DragSelector } from 'vue3-drag-selector'
 *
 * const onSelect = (items) => {
 *   console.log('Selected:', items)
 * }
 * </script>
 * ```
 */
export declare const DragSelector: DefineComponent<DragSelectorProps>

/**
 * Vue 3 Drag Selector Plugin
 *
 * @example
 * ```ts
 * import { createApp } from 'vue'
 * import Vue3DragSelector from 'vue3-drag-selector'
 *
 * const app = createApp(App)
 * app.use(Vue3DragSelector)
 * ```
 */
export declare const Vue3DragSelector: {
    install(app: any): void
}

declare module 'vue' {
    export interface GlobalComponents {
        DragSelector: typeof DragSelector
    }
}

export default Vue3DragSelector