import { DefineComponent, Plugin } from 'vue'

export interface DragSelectorProps {
    threshold?: number | null
    liveSelection?: boolean
    selectionColor?: string
    borderColor?: string
    scrollZone?: number
    minScrollSpeed?: number
    maxScrollSpeed?: number
    scrollZoneRight?: number | null
    scrollZoneLeft?: number | null
    scrollZoneTop?: number | null
    scrollZoneBottom?: number | null
}

export interface DragSelectorEvents {
    'selection-start': () => void
    'selection-change': (items: Record<string, string>[]) => void
    'selection-end': () => void
}

export interface DragSelectorExposed {
    isSelected: (id: string | number) => boolean
    clearSelection: () => void
    selectedItems: Set<string>
}

declare const DragSelector: DefineComponent<DragSelectorProps, {}, {}, {}, {}, {}, {}, DragSelectorEvents>

declare const Vue3DragSelector: Plugin

export { DragSelector }
export default Vue3DragSelector