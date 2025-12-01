import type { DefineComponent } from 'vue'

export interface DragSelectorProps {
    /**
     * Overlap percentage required to select an item
     * @default null (touch to select)
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
     * @default null
     */
    scrollZoneRight?: number | null

    /**
     * Custom left edge scroll zone (px)
     * @default null
     */
    scrollZoneLeft?: number | null

    /**
     * Custom top edge scroll zone (px)
     * @default null
     */
    scrollZoneTop?: number | null

    /**
     * Custom bottom edge scroll zone (px)
     * @default null
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

declare const DragSelector: DefineComponent<DragSelectorProps>

declare const Vue3DragSelector: {
    install(app: any): void
}

declare module 'vue' {
    export interface GlobalComponents {
        DragSelector: typeof DragSelector
    }
}

export { DragSelector }
export default Vue3DragSelector