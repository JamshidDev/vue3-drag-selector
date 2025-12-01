import type { DefineComponent, App } from 'vue'

export interface DragSelectorProps {
    /**
     * Overlap percentage required to select an item
     * @default null (touch to select)
     * @example 0.5 = 50% overlap required
     */
    threshold?: number | null

    /**
     * Update selection in real-time while dragging
     * @default true
     */
    liveSelection?: boolean

    /**
     * Background color of selection box
     * @default 'rgba(59, 130, 246, 0.25)'
     */
    selectionColor?: string

    /**
     * Border color of selection box
     * @default 'rgba(59, 130, 246, 0.8)'
     */
    borderColor?: string

    /**
     * Distance from edge to trigger auto-scroll (px)
     * @default 60
     */
    scrollZone?: number

    /**
     * Minimum auto-scroll speed
     * @default 3
     */
    minScrollSpeed?: number

    /**
     * Maximum auto-scroll speed
     * @default 15
     */
    maxScrollSpeed?: number

    /**
     * Custom right edge scroll zone (px)
     * @default null (uses scrollZone)
     */
    scrollZoneRight?: number | null

    /**
     * Custom left edge scroll zone (px)
     * @default null (uses scrollZone)
     */
    scrollZoneLeft?: number | null

    /**
     * Custom top edge scroll zone (px)
     * @default null (uses scrollZone)
     */
    scrollZoneTop?: number | null

    /**
     * Custom bottom edge scroll zone (px)
     * @default null (uses scrollZone)
     */
    scrollZoneBottom?: number | null
}

export interface SelectedItem {
    id: string
    [key: string]: string
}

export interface DragSelectorExposed {
    isSelected: (id: string | number) => boolean
    clearSelection: () => void
    selectedItems: Set<string>
}

export interface DragSelectorEmits {
    (e: 'selection-start'): void
    (e: 'selection-change', items: SelectedItem[]): void
    (e: 'selection-end'): void
}

declare const DragSelector: DefineComponent<DragSelectorProps>

declare const Vue3DragSelector: {
    install: (app: App) => void
}

export { DragSelector }
export default Vue3DragSelector