import type { DefineComponent } from 'vue'

export interface SelectedItem {
    id: string
    [key: string]: string
}

export interface DragSelectorProps {
    /**
     * Overlap percentage required to select an item.
     * @default null
     */
    threshold?: number | null

    /**
     * Update selection in real-time while dragging.
     * @default true
     */
    liveSelection?: boolean

    /**
     * Background color of the selection box.
     * @default 'rgba(59, 130, 246, 0.25)'
     */
    selectionColor?: string

    /**
     * Border color of the selection box.
     * @default 'rgba(59, 130, 246, 0.8)'
     */
    borderColor?: string

    /**
     * Distance in pixels from container edge to trigger auto-scroll.
     * @default 60
     */
    scrollZone?: number

    /**
     * Minimum auto-scroll speed in pixels per frame.
     * @default 3
     */
    minScrollSpeed?: number

    /**
     * Maximum auto-scroll speed in pixels per frame.
     * @default 15
     */
    maxScrollSpeed?: number

    /**
     * Custom scroll zone for right edge (px).
     * @default null
     */
    scrollZoneRight?: number | null

    /**
     * Custom scroll zone for left edge (px).
     * @default null
     */
    scrollZoneLeft?: number | null

    /**
     * Custom scroll zone for top edge (px).
     * @default null
     */
    scrollZoneTop?: number | null

    /**
     * Custom scroll zone for bottom edge (px).
     * @default null
     */
    scrollZoneBottom?: number | null

    /**
     * Disable component
     * @default false
     */
    disable?: boolean

}

/**
 * Drag selection started
 * Emits when user begins dragging.
 */
export declare const DragSelector: DefineComponent<
    DragSelectorProps,
    {},
    {},
    {},
    {},
    {},
    {},
    {
        /**
         * Fired when drag selection starts.
         */
        selectionStart: () => void

        /**
         * Fired when selection changes during dragging.
         * @param items Array of currently selected items.
         */
        selectionChange: (items: SelectedItem[]) => void

        /**
         * Fired when drag selection ends.
         */
        selectionEnd: () => void
    }
>

export interface DragSelectorExposed {
    isSelected: (id: string | number) => boolean
    clearSelection: () => void
    selectedItems: Set<string>
}

export declare const DragSelector: DefineComponent<DragSelectorProps>

export declare const Vue3DragSelector: {
    install(app: any): void
}

declare module 'vue' {
    export interface GlobalComponents {
        DragSelector: typeof DragSelector
    }
}

export default Vue3DragSelector